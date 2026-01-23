from setup.models import InventoryItem, Project
from rest_framework import serializers



class ProjectInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['id', 'name']  

class CreateInventoryItemSerializer(serializers.ModelSerializer):
    projects = serializers.SerializerMethodField()

    class Meta:
        model = InventoryItem
        fields = '__all__'  

    def get_projects(self, obj):
        project_links = obj.project_inventories.all()  
        return [{
            'project_id': link.project.id,
            'project_name': link.project.name
        } for link in project_links]
