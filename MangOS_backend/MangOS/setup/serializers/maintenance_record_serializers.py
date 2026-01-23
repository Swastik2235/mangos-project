from setup.models import MaintenanceRecord
from rest_framework import serializers



class CreateMaintenanceRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaintenanceRecord
        fields = '__all__'
