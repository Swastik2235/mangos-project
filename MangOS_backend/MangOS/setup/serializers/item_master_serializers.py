from setup.models import ItemMaster
from rest_framework import serializers

class ItemMasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemMaster
        fields = '__all__'