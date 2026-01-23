from rest_framework import serializers
from mis_app.models import DispatchAndMiscCosts

class DispatchAndMiscCostsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DispatchAndMiscCosts
        fields = '__all__'
        