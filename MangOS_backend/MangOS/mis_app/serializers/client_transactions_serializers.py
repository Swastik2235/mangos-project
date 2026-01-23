from mis_app.models import ClientTransaction
from rest_framework import serializers

class ClientTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientTransaction
        fields = '__all__'
    
    