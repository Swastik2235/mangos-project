from setup.models import Step
from rest_framework import serializers



class StepSerializer(serializers.ModelSerializer):
    class Meta:
        model = Step
        fields = '__all__'
