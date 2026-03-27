import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'maths_backend.settings')
django.setup()

from users.serializers import CustomTokenObtainPairSerializer
from users.models import User

# Test with invalid email
data = {
    'username': 'nonexistent@example.com',
    'password': 'any'
}

serializer = CustomTokenObtainPairSerializer(data=data)
try:
    print("Testing with nonexistent email...")
    serializer.is_valid()
    print("Serializer validated (expected failure but not a 500)")
except Exception as e:
    print(f"CRASHED with error: {e}")

# Test with valid username but check if something else is wrong
data = {
    'username': 'admin',
    'password': 'admin123'
}

serializer = CustomTokenObtainPairSerializer(data=data)
try:
    print("\nTesting with valid admin...")
    if serializer.is_valid():
        print("Admin valid")
    else:
        print(f"Admin invalid: {serializer.errors}")
except Exception as e:
    print(f"CRASHED with error: {e}")
