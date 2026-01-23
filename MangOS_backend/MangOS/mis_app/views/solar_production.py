from mis_app.models import SolarProduction
from django.db.models import Sum
from mis_app.serializers.solar_production_serializers import SolarProductionSerializer
from rest_framework import viewsets, status
from django.http import JsonResponse

class SolarProductionViewSet(viewsets.ModelViewSet):

    serializer_class = SolarProductionSerializer

    def get_solar_production(self, request, *args, **kwargs):
      """
      Get all solar production data with totals.
      """
      try:
          solar_production = SolarProduction.objects.all()
  
          total_qty = solar_production.aggregate(total=Sum('daily_total_mt'))['total'] or 0
          total_value = solar_production.aggregate(total=Sum('daily_total_value'))['total'] or 0
          rate_for_month = total_value / total_qty if total_qty else 0
  
          serializer = self.get_serializer(solar_production, many=True)
  
          return JsonResponse({
              "success": True,
              "message": "Solar production data retrieved successfully.",
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
              "message": "Error retrieving solar production data.",
              "errors": str(e)
          }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get_solar_production_by_id(self, request, *args, **kwargs):
        """
        Get solar production data by id
        """
        try:
            solar_production = SolarProduction.objects.get(id=kwargs['id'])
            serializer = self.get_serializer(solar_production)
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        except SolarProduction.DoesNotExist:
            return JsonResponse({"error": "Solar production not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def add_solar_production(self, request, *args, **kwargs):
        """
        Add new solar production data
        """
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def update_solar_production(self, request, *args, **kwargs):
        """
        Update solar production data by id
        """
        try:
            # Fetch primary key from GET data
            id = request.data.GET.get('id')
            if not id:
                return JsonResponse({'error': 'ID not provided'}, status=status.HTTP_400_BAD_REQUEST)

            # Fetch the solar production entry using the ID
            solar_production = SolarProduction.objects.get(id=id)
            serializer = self.get_serializer(solar_production, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        except SolarProduction.DoesNotExist:
            return JsonResponse({"error": "Solar production not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def delete_solar_production(self, request, *args, **kwargs):
        """
        Delete solar production data by id
        """
        try:
            solar_production = SolarProduction.objects.get(id=kwargs['id'])
            solar_production.delete()
            return JsonResponse({"message": "Solar production deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
        except SolarProduction.DoesNotExist:
            return JsonResponse({"error": "Solar production not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
