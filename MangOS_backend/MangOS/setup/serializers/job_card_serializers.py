from setup.models import JobCard,JobCardReport
from rest_framework import serializers



class CreateJobCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobCard
        fields = '__all__'



class GetJobCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobCard
        fields = '__all__'   
        
        
class JobCardMinimalSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobCard
        fields = ['id', 'jc_no']     
        
        
        
        
class JobCardReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobCardReport
        fields = '__all__'

class JobCardSerializer(serializers.ModelSerializer):
    reports = JobCardReportSerializer(many=True, read_only=True)
    
    class Meta:
        model = JobCard
        exclude = ['bom_sheet', 'project']    
        
        
class JobCardReportSerializers(serializers.ModelSerializer):
    class Meta:
        model = JobCardReport
        fields = '__all__'

class GetJobCardSerializer(serializers.ModelSerializer):
    reports = JobCardReportSerializers(many=True, read_only=True)

    class Meta:
        model = JobCard
        fields = '__all__'                   
