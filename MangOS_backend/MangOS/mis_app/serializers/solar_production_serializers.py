from mis_app.models import SolarProduction
from rest_framework import serializers

class SolarProductionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SolarProduction
        fields = '__all__'