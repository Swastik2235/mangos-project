 
from rest_framework import serializers
from setup.models import Files

class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Files
        fields = '__all__' 
        extra_kwargs = {
            'uploaded_by': {'required': False}  
        }