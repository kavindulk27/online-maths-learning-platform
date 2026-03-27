import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'maths_backend.settings')
django.setup()

from users.models import User
from users.serializers import CustomTokenObtainPairSerializer

User.objects.filter(email='test@example.com').delete()
user = User.objects.create_user(username='test-0001', email='test@example.com', password='testpassword123', role='student')

# Try auth with username
s1 = CustomTokenObtainPairSerializer(data={'username': 'test-0001', 'password': 'testpassword123'})
print('Auth with username valid:', s1.is_valid())
if not s1.is_valid():
    print(s1.errors)

# Try auth with email
s2 = CustomTokenObtainPairSerializer(data={'username': 'test@example.com', 'password': 'testpassword123'})
print('Auth with email valid:', s2.is_valid())
if not s2.is_valid():
    print(s2.errors)
