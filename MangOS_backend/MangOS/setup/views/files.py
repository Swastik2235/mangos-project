from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from setup.models import Files  # Ensure this model name is correct
from setup.serializers.file_serializers import FileSerializer  # Adjust as needed



class FilesByProjectView(ViewSet):

    def list(self, request):
        project_id = request.query_params.get('project_id')
        if project_id:
            files = Files.objects.filter(project_id=project_id)
            serializer = FileSerializer(files, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response([], status=status.HTTP_200_OK)
        
        
    def update_by_file_id(self, request):
        file_id = request.data.get('id')
        print('file_id:',file_id)
        if file_id:
            try:
                file = Files.objects.get(id=file_id)
                serializer = FileSerializer(file, data=request.data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except Files.DoesNotExist:
                return Response({'detail': 'File not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'detail': 'ID not provided'}, status=status.HTTP_400_BAD_REQUEST)    
        
        
        
    def delete_by_file_id(self, request):
        file_id = request.query_params.get('id')
        if not file_id:
            return Response({'detail': 'ID not provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            file = Files.objects.get(id=file_id)
            file.delete()
            return Response({'detail': 'File deleted successfully'}, status=status.HTTP_200_OK)
        except Files.DoesNotExist:
            return Response({'detail': 'File not found'}, status=status.HTTP_404_NOT_FOUND)   
            
            
            
    def create_by_project_id(self, request):
        project_id = request.POST.get('project_id')
        if not project_id:
            return Response({'detail': 'project_id not provided'}, status=status.HTTP_400_BAD_REQUEST)

        data = request.data.copy()
        data['project'] = project_id  # add project ID to payload

        serializer = FileSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST ) 
        
        
    def get_by_file_id(self, request):
        file_id = request.query_params.get('id')
        if file_id:
            try:
                file = Files.objects.get(id=file_id)
                serializer = FileSerializer(file)
                return Response(serializer.data, status=status.HTTP_200_OK)
            except Files.DoesNotExist:
                return Response({'detail': 'File not found'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'detail': 'ID not provided'}, status=status.HTTP_400_BAD_REQUEST)                           
