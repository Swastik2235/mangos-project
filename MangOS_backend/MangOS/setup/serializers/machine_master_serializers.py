from setup.models import MachineMaster
from rest_framework import serializers



class CreateMachineMasterSerializer(serializers.ModelSerializer):
    class Meta:
        model = MachineMaster
        fields = '__all__'
