from mis_app.models import SalesOrder
from rest_framework import serializers

class SalesOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalesOrder
        fields = '__all__'
