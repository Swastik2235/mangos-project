from mis_app.models import DailyCostBreakdown
from rest_framework import serializers

class DailyCostBreakdownSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyCostBreakdown
        fields = '__all__'

        