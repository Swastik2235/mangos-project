from django.http import JsonResponse
from rest_framework import viewsets, status
from mis_app.models import Project
from mis_app.serializers.project_serializers import ProjectSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    """
    A viewset for handling Project CRUD operations.
    """
    serializer_class = ProjectSerializer

    def get_projects(self, request):
        """
        Get all projects.
        """
        try:
            projects = Project.objects.all()
            serializer = self.serializer_class(projects, many=True)
            return JsonResponse({'message': 'Projects fetched successfully', 'data': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return JsonResponse({'error': f'An error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def add_project(self, request):
        """
        Add a new project.
        """
        try:
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({'message': 'Project created successfully', 'data': serializer.data}, status=status.HTTP_201_CREATED)
            return JsonResponse({'error': 'Invalid data', 'details': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return JsonResponse({'error': f'An error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def update_project(self, request, pk):
        """
        Update an existing project.
        """
        try:
            project = Project.objects.get(pk=pk)
            serializer = self.serializer_class(project, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({'message': 'Project updated successfully', 'data': serializer.data}, status=status.HTTP_200_OK)
            return JsonResponse({'error': 'Invalid data', 'details': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Project.DoesNotExist:
            return JsonResponse({'error': 'Project not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return JsonResponse({'error': f'An error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete_project(self, request, pk):
        """
        Delete a project.
        """
        try:
            project = Project.objects.get(pk=pk)
            project.delete()
            return JsonResponse({'message': 'Project deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except Project.DoesNotExist:
            return JsonResponse({'error': 'Project not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return JsonResponse({'error': f'An error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get_project_by_id(self, request, pk):
        """
        Get a project by ID.
        """
        try:
            project = Project.objects.get(pk=pk)
            serializer = self.serializer_class(project)
            return JsonResponse({'message': 'Project fetched successfully', 'data': serializer.data}, status=status.HTTP_200_OK)
        except Project.DoesNotExist:
            return JsonResponse({'error': 'Project not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return JsonResponse({'error': f'An error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get_projects_by_client(self, request, client_id):
        """
        Get all projects for a specific client.
        """
        try:
            projects = Project.objects.filter(client_id=client_id)
            if projects.exists():
                serializer = self.serializer_class(projects, many=True)
                return JsonResponse({'message': 'Projects fetched successfully', 'data': serializer.data}, status=status.HTTP_200_OK)
            return JsonResponse({'error': 'No projects found for this client'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return JsonResponse({'error': f'An error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
