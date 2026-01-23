from mis_app.models import GalvanizingProduction
from rest_framework import serializers

class GalvanizingProductionSerializer(serializers.ModelSerializer):
    class Meta:
        model = GalvanizingProduction
        fields = '__all__'