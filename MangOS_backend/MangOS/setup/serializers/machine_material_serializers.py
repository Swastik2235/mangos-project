from setup.models import MachineMaterial
from rest_framework import serializers



class CreateMachineMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = MachineMaterial
        fields = '__all__'
