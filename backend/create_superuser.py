import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'maths_backend.settings')
django.setup()

from users.models import User

if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'admin123', role='admin')
    print("Superuser 'admin' created successfully with password 'admin123'")
else:
    print("Superuser 'admin' already exists")
