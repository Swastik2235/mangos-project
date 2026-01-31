#!/usr/bin/env bash
# exit on error
set -o errexit

# Install dependencies
pip install -r requirements.txt

# Collect static files
python manage.py collectstatic --no-input

# Run migrations
python manage.py migrate

# Try to create superuser (ignore if exists)
python manage.py create_admin || echo "Admin user already exists"

# Try to create employee user (ignore if exists)  
python manage.py create_employee || echo "Employee user already exists"