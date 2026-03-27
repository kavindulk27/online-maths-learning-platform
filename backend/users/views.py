from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import UserSerializer, CustomTokenObtainPairSerializer
from .models import User

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class ProfileUpdateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request):
        user = request.user
        data = request.data
        if 'first_name' in data:
            user.first_name = data['first_name']
        if 'email' in data:
            user.email = data['email']
        if 'phone' in data:
            user.phone = data['phone']
        user.save()
        return Response({'detail': 'Profile updated successfully.'})

class ChangePasswordView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')

        if not user.check_password(old_password):
            return Response({'old_password': ['Current password is incorrect.']}, status=status.HTTP_400_BAD_REQUEST)

        if not new_password or len(new_password) < 8:
            return Response({'new_password': ['Password must be at least 8 characters.']}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        return Response({'detail': 'Password changed successfully.'})
