import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'maths_backend.settings')
django.setup()

from django.contrib.auth import authenticate
from users.models import User

# Check user 2026-00001
# assuming the user set a password like 'password123' (I'll check the most likely one if they just registered)
# Actually, I'll just check if the password field looks hashed.

user = User.objects.get(username='2026-00001')
print(f"User: {user.username}")
print(f"Password Hashed Start: {user.password[:20]}...")

# Try to authenticate with a known password if we had one
# But we don't.
