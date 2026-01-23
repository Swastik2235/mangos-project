

from setup.models import InventoryCategory,InventoryItem
from rest_framework import serializers



class CreateInventoryCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryCategory
        fields = '__all__'


class InventoryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryItem
        fields = '__all__'


class InventoryCategorySerializer(serializers.ModelSerializer):
    items = InventoryItemSerializer(many=True, read_only=True)  

    class Meta:
        model = InventoryCategory
        fields = '__all__'