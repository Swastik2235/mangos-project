#!/usr/bin/env python
import os
import django
from django.contrib.auth import get_user_model

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'configurations.settings')
django.setup()

User = get_user_model()

# Create superuser if it doesn't exist
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser(
        username='admin',
        email='admin@test.com',
        password='admin123'
    )
    print("Superuser created successfully!")
else:
    print("Superuser already exists!")