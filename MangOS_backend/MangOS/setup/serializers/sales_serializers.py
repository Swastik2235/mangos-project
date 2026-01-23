 
 
from rest_framework import serializers
from setup.models import Sales, Cost

class SalesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sales
        fields = '__all__'


class CostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cost
        fields = '__all__' 