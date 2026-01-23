 
from setup.models import MachineQRCode
from rest_framework import serializers 
 
 
class MachineQRCodeSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = MachineQRCode
        fields = '__all__'

    def get_image_url(self, obj):
        request = self.context.get("request")
        if obj.qr_code:
            url = obj.qr_code.url
            full_url = request.build_absolute_uri(url) if request else url
            return full_url.replace("127.0.0.1:8000", "43.204.203.153:8000")  # Replace with actual server IP or domain
        return None 