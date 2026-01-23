from mis_app.models import ProductionSummary
from rest_framework import serializers

class ProductionSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductionSummary
        fields = '__all__'

