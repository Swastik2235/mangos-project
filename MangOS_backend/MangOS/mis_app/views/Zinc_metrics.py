from rest_framework import viewsets
from django.http import JsonResponse, HttpResponse
from rest_framework import status
from mis_app.models import ZincSavingMetrics
from mis_app.serializers.Zinc_saving_serializers import ZincSavingSerializer

class ZincSavingMetricsViewSet(viewsets.ModelViewSet):

    serializer_class = ZincSavingSerializer

    def get_metrics(self, request):
        """
        Get all Zinc Saving metrics.
        """
        try:
            metrics = ZincSavingMetrics.objects.all()
            serializer = self.get_serializer(metrics, many=True)
            return JsonResponse(serializer.data, safe=False)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def add_metrics(self, request):
        """
        Add new Zinc Saving metrics.
        """
        try:
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def update_metrics(self, request):
        """
        Update existing Zinc Saving metrics.
        """
        try:
            try:
                metric = request.GET.get('metric_id')
            except ZincSavingMetrics.DoesNotExist:
                return JsonResponse({'error': 'Metric not found'}, status=status.HTTP_404_NOT_FOUND)

            serializer = self.get_serializer(metric, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=status.HTTP_200_OK)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def delete_metrics(self, request):
        """
        Delete Zinc Saving metrics.
        """
        try:
            try:
                metric = request.GET.get('metric_id')
            except ZincSavingMetrics.DoesNotExist:
                return JsonResponse({'error': 'Metric not found'}, status=status.HTTP_404_NOT_FOUND)

            metric.delete()
            return JsonResponse({'message': 'Metric deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    