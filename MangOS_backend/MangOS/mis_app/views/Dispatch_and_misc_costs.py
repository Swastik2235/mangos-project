from rest_framework import viewsets
from django.http import JsonResponse
from rest_framework import status
from mis_app.models import DispatchAndMiscCosts
from mis_app.serializers.dispatch_costs_serializers import DispatchAndMiscCostsSerializer

class DispatchAndMiscCostsViewSet(viewsets.ModelViewSet):
    serializer_class = DispatchAndMiscCostsSerializer

    def get_dispatch_and_misc_costs(self, request):
        """
        Get all dispatch and misc costs.
        """
        try:
            dispatch_and_misc_costs = DispatchAndMiscCosts.objects.all()
            serializer = self.get_serializer(dispatch_and_misc_costs, many=True)
            return JsonResponse(serializer.data, safe=False)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def add_dispatch_and_misc_costs(self, request):
        """
        Add a new dispatch and misc cost.
        """
        try:
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def update_dispatch_and_misc_costs(self, request):
        """
        Update an existing dispatch and misc cost.
        """
        try:
            dispatch_id = request.data.get('dispatch_id')  # Use GET for the ID
            if not dispatch_id:
                return JsonResponse({'error': 'Dispatch ID is required'}, status=status.HTTP_400_BAD_REQUEST)
            
            try:
                dispatch = DispatchAndMiscCosts.objects.get(pk=dispatch_id)
            except DispatchAndMiscCosts.DoesNotExist:
                return JsonResponse({'error': 'Dispatch and misc cost not found'}, status=status.HTTP_404_NOT_FOUND)
            
            serializer = self.get_serializer(dispatch, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=status.HTTP_200_OK)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def delete_dispatch_and_misc_costs(self, request):
        """
        Delete a dispatch and misc cost.
        """
        try:
            dispatch_id = request.data.get('dispatch_id')  # Use GET for the ID
            if not dispatch_id:
                return JsonResponse({'error': 'Dispatch ID is required'}, status=status.HTTP_400_BAD_REQUEST)
            
            try:
                dispatch = DispatchAndMiscCosts.objects.get(pk=dispatch_id)
            except DispatchAndMiscCosts.DoesNotExist:
                return JsonResponse({'error': 'Dispatch and misc cost not found'}, status=status.HTTP_404_NOT_FOUND)
            
            dispatch.delete()
            return JsonResponse({'message': 'Dispatch and misc cost deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
