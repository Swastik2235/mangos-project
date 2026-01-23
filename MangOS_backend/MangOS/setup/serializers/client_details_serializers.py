from setup.models import ClientDetails
from rest_framework import serializers



class CreateClientDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientDetails
        fields = '__all__'
