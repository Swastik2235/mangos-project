from rest_framework import viewsets, status
from django.http import JsonResponse
from mis_app.models import ManpowerCost
from django.db.models import Sum
from mis_app.serializers.manpower_costs_serializers import ManpowerCostSerializer

class ManpowerCostViewSet(viewsets.ViewSet):
    """
    A viewset for performing CRUD manpower cost instances.
    """
    def get_manpowercost(self, request):
        """
        Retrieve a list of manpower costs.
        """
        try:
            manpower_costs = ManpowerCost.objects.all()
            serializer = ManpowerCostSerializer(manpower_costs, many=True)
            return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def add_manpowercost(self, request):
        """
        Add a new manpower cost instance.
        """
        try:
            serializer = ManpowerCostSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def update_manpowercost(self, request):
        """
        Update an existing manpower cost instance.
        """
        try:
            manpower_cost = request.GET.get('id')
            if not manpower_cost:
                return JsonResponse({'error': 'ID is required'}, status=status.HTTP_400_BAD_REQUEST)
            serializer = ManpowerCostSerializer(manpower_cost, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=status.HTTP_200_OK)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ManpowerCost.DoesNotExist:
            return JsonResponse({'error': 'ManpowerCost not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def delete_manpowercost(self, request):
        """
        Delete a manpower cost instance.
        """
        try:
            manpower_cost = request.GET.get('id')
            if not manpower_cost:
                return JsonResponse({'error': 'ID is required'}, status=status.HTTP_400_BAD_REQUEST)
            manpower_cost_instance = ManpowerCost.objects.get(id=manpower_cost)
            manpower_cost_instance.delete()
            return JsonResponse({'message': 'ManpowerCost deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        
        except ManpowerCost.DoesNotExist:
            return JsonResponse({'error': 'ManpowerCost not found'}, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def get_manpowercost_by_type(self,request):
        """
        Retrieve manpower costs by type.
        """
        try:
            manpower_cost_type = request.GET.get('role_type')
            if not manpower_cost_type:
                return JsonResponse({'error': 'Type is required'}, status=status.HTTP_400_BAD_REQUEST)
            manpower_costs = ManpowerCost.objects.filter(type=manpower_cost_type)
            serializer = ManpowerCostSerializer(manpower_costs, many=True)
            return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def get_total_manpower_cost(self, request):
        """
        Retrieve the total manpower cost.
        """
        try:
            total_cost = ManpowerCost.objects.aggregate(Sum('cost'))
            return JsonResponse(total_cost, safe=False, status=status.HTTP_200_OK)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def get_manpowercost_by_id(self, request):
        """
        Retrieve a manpower cost instance by ID.
        """
        try:
            manpower_cost_id = request.GET.get('id')
            if not manpower_cost_id:
                return JsonResponse({'error': 'ID is required'}, status=status.HTTP_400_BAD_REQUEST)
            manpower_cost = ManpowerCost.objects.get(id=manpower_cost_id)
            serializer = ManpowerCostSerializer(manpower_cost)
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        except ManpowerCost.DoesNotExist:
            return JsonResponse({'error': 'ManpowerCost not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def get_manpowercost_by_project(self, request):
        """
        Retrieve manpower costs by project.
        """
        try:
            project_id = request.GET.get('project_id')
            if not project_id:
                return JsonResponse({'error': 'Project ID is required'}, status=status.HTTP_400_BAD_REQUEST)
            manpower_costs = ManpowerCost.objects.filter(project_id=project_id)
            serializer = ManpowerCostSerializer(manpower_costs, many=True)
            return JsonResponse(serializer.data, safe=False, status=status.HTTP_200_OK)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
             