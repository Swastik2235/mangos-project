from setup.models import Employee
from rest_framework import serializers



class CreateEmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'
