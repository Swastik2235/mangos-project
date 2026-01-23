from mis_app.models import ProfitLossSummary
from rest_framework import serializers

class ProfitLossSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProfitLossSummary
        fields = '__all__'