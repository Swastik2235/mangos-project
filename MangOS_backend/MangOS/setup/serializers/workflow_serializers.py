from setup.models import Workflow
from rest_framework import serializers



class WorkflowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workflow
        fields = '__all__'
