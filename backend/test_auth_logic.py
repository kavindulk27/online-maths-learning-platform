import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'maths_backend.settings')
django.setup()

from django.contrib.auth import authenticate
from users.models import User

# Check user 2026-00001
# We don't know the password the user set, but we can try common ones if we want.
# Better: Create a new user with a known password and try to log in.

try:
    test_user = User.objects.create_user(username='test-login', password='password123', role='student')
    print(f"Created test user: {test_user.username}")
    
    user = authenticate(username='test-login', password='password123')
    if user:
        print("Authentication successful for test-login")
    else:
        print("Authentication FAILED for test-login")
        
    test_user.delete()
    print("Deleted test user")
except Exception as e:
    print(f"Error: {e}")
