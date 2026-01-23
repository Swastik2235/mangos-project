from mis_app.models import ScrapGenerationMetrics
from rest_framework import serializers

class ScrapGenerationMetricsSerializers(serializers.ModelSerializer):
    class Meta:
        model = ScrapGenerationMetrics
        fields = '__all__'

