from mis_app.models import TransactionProgress
from rest_framework import serializers

class TransactionProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionProgress
        fields = '__all__'

        