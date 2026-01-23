from mis_app.models import ScrapGenerationMetrics
from django.db.models import Sum
from mis_app.serializers.scrap_gen_metrics_serializers import ScrapGenerationMetricsSerializers
from django.http import JsonResponse
from rest_framework import viewsets, status

class ScrapMetricsViewSet(viewsets.ViewSet):
    """
    A viewset for CRUD ops on scrap generation metrics.
    """
    serializer_class = ScrapGenerationMetricsSerializers

    def get_scrap_metrics(self, request):
      """
      Retrieve scrap generation metrics with totals.
      """
      try:
          scrap_metrics = ScrapGenerationMetrics.objects.all()
  
          total_qty = scrap_metrics.aggregate(total=Sum('actual_quantity'))['total'] or 0
          total_value = scrap_metrics.aggregate(total=Sum('actual_value'))['total'] or 0
          rate_for_month = total_value / total_qty if total_qty else 0
  
          serializer = self.serializer_class(scrap_metrics, many=True)
  
          return JsonResponse({
              "success": True,
              "message": "Scrap generation metrics retrieved successfully.",
              "totals": {
                  "total_quantity_mt": total_qty,
                  "average_rate_per_mt": round(rate_for_month, 2),
                  "total_value": total_value
              },
              "data": serializer.data
          }, status=status.HTTP_200_OK)
  
      except Exception as e:
          return JsonResponse({
              "success": False,
              "message": "Error retrieving scrap metrics.",
              "errors": str(e)
          }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def add_scrap_metrics(self, request):
        """
        Add new scrap generation metrics.
        """
        try:
            serializer = self.seralizer_class(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def update_scrap_metrics(self,request):
        """
        Update existing scrap generation metrics.
        """
        try:
            scrap_metrics = request.GET.get('id')
            serializer = self.seralizer_class(scrap_metrics, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=status.HTTP_200_OK)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ScrapGenerationMetrics.DoesNotExist:
            return JsonResponse({'error': 'Scrap metrics not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def delete_scrap_metrics(self, request):
        """
        Delete scrap generation metrics.
        """
        try:
            scrap_metrics = request.GET.get('id')
            scrap_metrics.delete()
            return JsonResponse({'message': 'Scrap metrics deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except ScrapGenerationMetrics.DoesNotExist:
            return JsonResponse({'error': 'Scrap metrics not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    