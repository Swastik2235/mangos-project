from mis_app.models import ZincSavingMetrics
from rest_framework import serializers

class ZincSavingSerializer(serializers.ModelSerializer):
    """
    Serializer for Zinc Saving metrics.
    """
    class Meta:
        model = ZincSavingMetrics
        fields = '__all__'

        