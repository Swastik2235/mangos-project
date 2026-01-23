from mis_app.models import FabPlusGalvaProduction
from rest_framework import serializers

class FabPlusGalvaProductionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FabPlusGalvaProduction
        fields = '__all__'
# The above code defines a serializer for the FabPlusGalvaProduction model, which is used to convert model instances to JSON format and validate incoming data. The serializer includes all fields from the model by using `fields = '__all__'`.