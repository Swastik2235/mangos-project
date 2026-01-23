from rest_framework import serializers
from mis_app.models import Departement

class DepartementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departement
        fields = '__all__'