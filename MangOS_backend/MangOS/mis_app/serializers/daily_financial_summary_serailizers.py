from rest_framework import serializers
from mis_app.models import DailyFinancialSummary

class DailyFinancialSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyFinancialSummary
        fields = '__all__'
        