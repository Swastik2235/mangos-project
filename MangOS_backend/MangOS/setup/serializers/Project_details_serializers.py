from setup.models import Project
from rest_framework import serializers



class ProjectDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
