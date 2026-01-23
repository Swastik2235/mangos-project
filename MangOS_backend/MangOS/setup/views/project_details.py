from django.shortcuts import get_object_or_404
from django.conf import settings
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.http import JsonResponse
from setup.serializers.Project_details_serializers import ProjectDetailsSerializer
from setup.serializers.file_serializers import FileSerializer
from setup.serializers.bom_sheet_serializers import CreateBOMSheetSerializer
from setup.serializers.client_details_serializers import CreateClientDetailsSerializer
from setup.models import *
import os

class ProjectViewset(viewsets.ModelViewSet):
    serializer_class = ProjectDetailsSerializer
            
    def get_project_name(self, request):
      try:
          projects = Project.objects.all().values('id', 'name').order_by('-id')
          return JsonResponse({
              "success": True,
              "status": status.HTTP_200_OK,
              "message": "Project names retrieved successfully",
              "data": list(projects)
          })
      except Exception as e:
          return JsonResponse({
              "success": False,
              "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
              "message": "Failed to retrieve Project names",
              "errors": str(e)
          })
          
          
          
          
          

    def get_project_details(self, request):
      try:
          projects = Project.objects.all()
          serializer = ProjectDetailsSerializer(projects, many=True)
  
          return JsonResponse({
              "success": True,
              "status": status.HTTP_200_OK,
              "message": "Projects retrieved successfully",
              "data": serializer.data
          }, status=status.HTTP_200_OK)
  
      except Exception as e:
          return JsonResponse({
              "success": False,
              "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
              "message": "Failed to retrieve Projects",
              "errors": str(e)
          }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
          
          
          
          
          
                
          
    def update_project_details(self, request):
      try:
          project_id = request.GET.get("project_id")
          if not project_id:
              return JsonResponse({
                  "success": False,
                  "status": status.HTTP_400_BAD_REQUEST,
                  "message": "Missing 'project_id' in query parameters."
              }, status=status.HTTP_400_BAD_REQUEST)
  
          project = get_object_or_404(Project, id=project_id)
  
          # Update fields
          project.name = request.data.get("name", project.name)
          project.consignment_id = request.data.get("consignment_id", project.consignment_id)
          project.workflow = request.data.get("workflow", project.workflow)
          project.start_date = request.data.get("start_date", project.start_date)
          project.end_date = request.data.get("end_date", project.end_date)
          project.description = request.data.get("description", project.description)
  
          # Update BOM sheet if a new file is uploaded
          bom_file = request.FILES.get("bom_sheet")
          if bom_file:
              bom_instance = BOMSheet.objects.create(name=f"BOM for {project.name}", bom_file=bom_file)
              project.bom_sheet = bom_instance
  
          project.save()
  
          return JsonResponse({
              "success": True,
              "status": status.HTTP_200_OK,
              "message": "Project updated successfully.",
              "data": ProjectDetailsSerializer(project).data
          }, status=status.HTTP_200_OK)
  
      except Project.DoesNotExist:
          return JsonResponse({
              "success": False,
              "status": status.HTTP_404_NOT_FOUND,
              "message": "Project not found"
          }, status=status.HTTP_404_NOT_FOUND)
  
      except Exception as e:
          return JsonResponse({
              "success": False,
              "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
              "message": "Failed to update project",
              "error": str(e)
          }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
          
          
          
          
          
          
          
          
    def create_project(self, request):
      try:
          print(request.data)
          # Optional fields
          name = request.data.get("name")
          consignment_id = request.data.get("consignment_id")
          client_id = request.data.get("client_id")
          workflow_id = request.data.get("workflow")
          start_date = request.data.get("start_date")
          end_date = request.data.get("end_date")
          description = request.data.get("description")
          employee_id = request.data.get("employee")
          machine_id = request.data.get("machine")
  
          # Fetch related objects if provided
          client = ClientDetails.objects.filter(id=client_id).first() if client_id else None
          workflow = Workflow.objects.filter(id=workflow_id).first() if workflow_id else None
          employee = Employee.objects.filter(id=employee_id).first() if employee_id else None
          machine = MachineMaster.objects.filter(id=machine_id).first() if machine_id else None
  
          # Handle BOM Sheet Upload
          bom_file = request.FILES.get("bom_sheet")
          bom_instance = None
          bom_url = None
          if bom_file:
              bom_instance = BOMSheet.objects.create(name=f"BOM for {name or 'Unnamed Project'}", bom_file=bom_file)
              bom_url = request.build_absolute_uri(bom_instance.bom_file.url)
  
          # Create the Project
          project = Project.objects.create(
              name=name or "Untitled Project",
              client=client,
              consignment_id=consignment_id,
              workflow=workflow,
              start_date=start_date,
              end_date=end_date,
              description=description,
              bom_sheet=bom_instance,
              employee=employee,
              machine=machine
          )
  
          # File Uploads
          uploaded_files = request.FILES.getlist("files")
          for file in uploaded_files:
              Files.objects.create(
                  project=project,
                  uploaded_by=client,
                  file_name=file.name,
                  file_path=file
              )
  
          return JsonResponse({
              "success": True,
              "message": "Project created successfully.",
              "project": ProjectDetailsSerializer(project).data,
              "bom_sheet": {
                  "id": bom_instance.id if bom_instance else None,
                  "name": bom_instance.name if bom_instance else None,
                  "file_url": bom_url
              } if bom_instance else None,
              "files": FileSerializer(Files.objects.filter(project=project), many=True).data
          }, status=status.HTTP_201_CREATED)
  
      except Exception as e:
          return JsonResponse({
              "success": False,
              "message": "Error while creating project",
              "error": str(e)
          }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

