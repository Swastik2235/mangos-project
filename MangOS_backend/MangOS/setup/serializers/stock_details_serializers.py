from rest_framework import serializers
from setup.models import StockDetails

class StockDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockDetails
        fields = '__all__'