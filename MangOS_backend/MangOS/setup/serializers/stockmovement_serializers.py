from setup.models import StockMovement , Project , ItemMaster
from rest_framework import serializers

class StockMovementSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = StockMovement
        fields = '__all__'
        