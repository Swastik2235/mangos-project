from mis_app.models import FabricationProduction
from rest_framework import serializers

class FabricationProductionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FabricationProduction
        fields = '__all__'