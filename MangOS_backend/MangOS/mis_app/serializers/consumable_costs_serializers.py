from rest_framework import serializers
from mis_app.models import ConsumablesAndWasteCosts

class ConsumablesAndWasteCostsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsumablesAndWasteCosts
        fields = '__all__'

        