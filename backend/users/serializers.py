from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=False, allow_blank=True)
    password = serializers.CharField(write_only=True)
    grade = serializers.CharField(write_only=True, required=False)
    school = serializers.CharField(write_only=True, required=False)
    district = serializers.CharField(write_only=True, required=False)
    parent_phone = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'role', 'phone', 'password', 'first_name', 'grade', 'school', 'district', 'parent_phone')

    def create(self, validated_data):
        grade = validated_data.pop('grade', None)
        school = validated_data.pop('school', None)
        district = validated_data.pop('district', None)
        parent_phone = validated_data.pop('parent_phone', None)
        
        role = validated_data.get('role', 'student')
        
        if role == 'student':
            import datetime
            year = datetime.date.today().year
            last_student = User.objects.filter(role='student', username__startswith=f"{year}-").order_by('-username').first()
            if last_student:
                try:
                    last_num = int(last_student.username.split('-')[1])
                    next_num = last_num + 1
                except (IndexError, ValueError):
                    next_num = 1
            else:
                next_num = 1
            
            validated_data['username'] = f"{year}-{str(next_num).zfill(4)}"
        
        # Explicitly handle password hashing
        password = validated_data.pop('password', None)
        user = User(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        
        if user.role == 'student':
            from students.models import StudentProfile
            StudentProfile.objects.create(
                user=user,
                grade=grade or '',
                school=school or '',
                district=district or '',
                parent_phone=parent_phone or ''
            )
        return user

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # Allow login with either email or username
        username = attrs.get('username')
        if username and isinstance(username, str) and '@' in username:
            # Safely try to find user by email
            user = User.objects.filter(email__iexact=username).first()
            if user:
                attrs['username'] = user.username
        
        try:
            return super().validate(attrs)
        except Exception as e:
            # Ensure we don't leak server errors if super().validate crashes unexpectedly
            raise e

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role
        token['username'] = user.username
        return token
