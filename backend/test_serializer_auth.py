import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'maths_backend.settings')
django.setup()

from django.contrib.auth import authenticate
from users.models import User
from users.serializers import UserSerializer

# Simulate registration through serializer
reg_data = {
    'email': 'serializer_test@example.com',
    'password': 'testpassword123',
    'first_name': 'Serializer Test',
    'role': 'student',
    'grade': 'Grade 11'
}

serializer = UserSerializer(data=reg_data)
if serializer.is_valid():
    user = serializer.save()
    print(f"Registered user: {user.username}")
    
    # Try to login
    auth_user = authenticate(username=user.username, password='testpassword123')
    if auth_user:
        print("Login successful for serializer-created user!")
    else:
        print("Login FAILED for serializer-created user!")
        
    user.delete()
else:
    print(f"Serializer errors: {serializer.errors}")
