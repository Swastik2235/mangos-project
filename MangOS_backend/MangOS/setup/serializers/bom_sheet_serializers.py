from setup.models import BOMSheet
from rest_framework import serializers



class CreateBOMSheetSerializer(serializers.ModelSerializer):
    class Meta:
        model = BOMSheet
        fields = '__all__'
