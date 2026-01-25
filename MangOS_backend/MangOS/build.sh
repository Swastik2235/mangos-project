#!/usr/bin/env bash
# exit on error
set -o errexit

pip install -r requirements.txt

python manage.py collectstatic --no-input

# Try migrate with --fake-initial first, if that fails, try regular migrate
python manage.py migrate --fake-initial || python manage.py migrate

# Create superuser
python manage.py shell -c "
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@test.com', 'admin123')
    print('Superuser created!')
else:
    print('Superuser already exists!')
"