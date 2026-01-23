from mis_app.models import ManpowerCost
from rest_framework import serializers

class ManpowerCostSerializer(serializers.ModelSerializer):
    class Meta:
        model = ManpowerCost
        fields = '__all__'
