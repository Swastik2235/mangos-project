from rest_framework import serializers
from mis_app.models import CriticalCostParameters

class CriticalCostSerializer(serializers.ModelSerializer):
    class Meta:
        model = CriticalCostParameters
        fields = '__all__'