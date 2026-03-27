from rest_framework import serializers
from .models import Payment
from users.serializers import UserSerializer

class PaymentSerializer(serializers.ModelSerializer):
    student = serializers.PrimaryKeyRelatedField(read_only=True)
    student_details = UserSerializer(source='student', read_only=True)
    grade = serializers.SerializerMethodField()

    class Meta:
        model = Payment
        fields = ('id', 'student', 'student_details', 'amount', 'receipt_image', 'status', 'submitted_at', 'approved_at', 'month', 'grade')
    
    def get_grade(self, obj):
        try:
            return obj.student.studentprofile.grade
        except:
            return "N/A"
