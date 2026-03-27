import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'maths_backend.settings')
django.setup()

from django.contrib.auth import authenticate
from users.models import User

# Test admin login
user = authenticate(username='admin', password='admin123')
if user:
    print("Admin authentication SUCCESSFUL with password 'admin123'")
else:
    print("Admin authentication FAILED with password 'admin123'")
    # Check if admin exists at all
    try:
        admin = User.objects.get(username='admin')
        print(f"Admin user found with ID {admin.id}, but password 'admin123' is incorrect.")
    except User.DoesNotExist:
        print("Admin user does not exist!")
