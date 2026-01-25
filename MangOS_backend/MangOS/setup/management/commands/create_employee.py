from django.core.management.base import BaseCommand
from setup.models import Employee
from django.contrib.auth.hashers import make_password

class Command(BaseCommand):
    help = 'Create default employee user'

    def handle(self, *args, **options):
        if not Employee.objects.filter(email='admin@test.com').exists():
            Employee.objects.create(
                employee_id='EMP001',
                first_name='Admin',
                last_name='User',
                email='admin@test.com',
                phone_number='1234567890',
                employment_type='full_time',
                department='IT',
                designation='Plant',
                user_name='admin',
                password=make_password('admin123'),
                is_active=True
            )
            self.stdout.write(
                self.style.SUCCESS('Successfully created employee user')
            )
        else:
            self.stdout.write(
                self.style.WARNING('Employee user already exists')
            )