#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

python manage.py collectstatic --no-input

# Try migrate with --fake-initial first, if that fails, try regular migrate
python manage.py migrate --fake-initial || python manage.py migrate

# Create superuser using management command
python manage.py create_admin

# Create default employee user
python manage.py create_employee