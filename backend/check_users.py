import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'maths_backend.settings')
django.setup()

from users.models import User

print("Existing Users:")
for user in User.objects.all():
    print(f"ID: {user.id}, Username: {user.username}, Role: {user.role}, Active: {user.is_active}")
