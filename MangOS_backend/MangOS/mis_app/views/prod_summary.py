from mis_app.models import ProductionSummary
from mis_app.serializers.prod_summary_serializers import ProductionSummarySerializer
from rest_framework import viewsets, permissions
from django.http import JsonResponse

class ProductionSummaryViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows production summaries to be viewed or edited.
    """
    serializer_class = ProductionSummarySerializer

    def get_prod_summary(self,request):
        try:
            prod_summary = ProductionSummary.objects.all()
            serializer = ProductionSummarySerializer(prod_summary, many=True)
            return JsonResponse(serializer.data, safe=False)
        except ProductionSummary.DoesNotExist:
            return JsonResponse({'error': 'Production summary not found'}, status=404)
            
    def get_fab_prod_data(self, request):
      try:
          fab_data = list(
              ProductionSummary.objects.values(
                  'summary_date',
                  'total_fabrication_quantity',
                  'total_fabrication_sales'
              )
          )
          return JsonResponse(fab_data, safe=False)
      except Exception as e:
          return JsonResponse({'error': str(e)}, status=500)

          

    def get_galva_prod_data(self, request):
      try:
          galva_data = list(
              ProductionSummary.objects.values(
                  'summary_date',
                  'total_galvanizing_quantity',
                  'total_galvanizing_sales'
              )
          )
          return JsonResponse(galva_data, safe=False)
      except Exception as e:
          return JsonResponse({'error': str(e)}, status=500)


    def get_solar_prod_data(self, request):
      try:
          solar_data = list(
              ProductionSummary.objects.values(
                  'summary_date',
                  'total_solar_quantity',
                  'total_solar_sales'
              )
          )
          return JsonResponse(solar_data, safe=False)
      except Exception as e:
          return JsonResponse({'error': str(e)}, status=500)


    def get_scrap_data(self, request):
      try:
          scrap_data = list(
              ProductionSummary.objects.values(
                  'summary_date',
                  'total_scrap_sales'
              )
          )
          return JsonResponse(scrap_data, safe=False)
      except Exception as e:
          return JsonResponse({'error': str(e)}, status=500)


        
    def add_prod_summary(self, request):
        try:
            serializer = ProductionSummarySerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=201)
            return JsonResponse(serializer.errors, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    def update_prod_summary(self, request):
        try:
            prod_summary = request.GET.get('id')
            if not prod_summary:
                return JsonResponse({'error': 'ID not provided'}, status=400)
            serializer = ProductionSummarySerializer(prod_summary, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=200)
            return JsonResponse(serializer.errors, status=400)
        except ProductionSummary.DoesNotExist:
            return JsonResponse({'error': 'Production summary not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
        
    def delete_prod_summary(self, request):
        try:
            prod_summary = request.GET.get('id')
            if not prod_summary:
                return JsonResponse({'error': 'ID not provided'}, status=400)
            prod_summary.delete()
            return JsonResponse({'message': 'Production summary deleted successfully'}, status=204)
        except ProductionSummary.DoesNotExist:
            return JsonResponse({'error': 'Production summary not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
        
    