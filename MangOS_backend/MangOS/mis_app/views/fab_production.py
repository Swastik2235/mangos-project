from rest_framework import viewsets, status
from django.db.models import Sum
from django.http import JsonResponse
from mis_app.models import FabricationProduction
from mis_app.serializers.fabrication_production_serializers import FabricationProductionSerializer
from django.db.models.functions import TruncMonth
from collections import OrderedDict
from datetime import datetime


class FabricationProductionViewSet(viewsets.ModelViewSet):
    serializer_class = FabricationProductionSerializer

    def get_fabrication_production(self, request, *args, **kwargs):
      """
      Retrieve all fabrication production records with overall and monthly totals.
      """
      try:
          records = FabricationProduction.objects.all()
  
          # Overall aggregates
          total_qty = records.aggregate(total=Sum('daily_total_mt'))['total'] or 0
          total_value = records.aggregate(total=Sum('daily_total_value'))['total'] or 0
          overall_rate = total_value / total_qty if total_qty else 0
  
          # Monthly aggregation using production_date
          monthly_data = (
              records.annotate(month=TruncMonth('production_date'))
              .values('month')
              .annotate(
                  total_qty=Sum('daily_total_mt'),
                  total_value=Sum('daily_total_value')
              )
              .order_by('month')
          )
  
          # Format monthly data
          monthly_totals = OrderedDict()
          for entry in monthly_data:
              month_str = entry['month'].strftime('%Y-%m')
              month_qty = entry['total_qty'] or 0
              month_value = entry['total_value'] or 0
              month_rate = month_value / month_qty if month_qty else 0
  
              monthly_totals[month_str] = {
                  'total_quantity_mt': round(month_qty, 2),
                  'total_value': round(month_value, 2),
                  'average_rate_per_mt': round(month_rate, 2)
              }
  
          # Serialize all records
          serializer = self.get_serializer(records.order_by('production_date'), many=True)
  
          return JsonResponse({
              "success": True,
              "message": "Fabrication production data retrieved successfully.",
              "overall_totals": {
                  "total_quantity_mt": round(total_qty, 2),
                  "average_rate_per_mt": round(overall_rate, 2),
                  "total_value": round(total_value, 2)
              },
              "monthly_totals": monthly_totals,
              "data": serializer.data
          }, status=status.HTTP_200_OK)
  
      except Exception as e:
          return JsonResponse({
              "success": False,
              "message": "Error retrieving fabrication production data.",
              "errors": str(e)
          }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def add_fabrication_production(self, request, *args, **kwargs):
        """
        Add a new fabrication production record.
        """
        try:
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({
                    "success": True,
                    "message": "Fabrication production data added successfully.",
                    "data": serializer.data
                }, status=status.HTTP_201_CREATED)
            return JsonResponse({
                "success": False,
                "message": "Validation failed.",
                "errors": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return JsonResponse({
                "success": False,
                "message": "Error adding fabrication production data.",
                "errors": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def update_fabrication_production(self, request, *args, **kwargs):
        """
        Update an existing fabrication production record.
        """
        try:
            production_id = request.GET.get('id')
            if not production_id:
                return JsonResponse({
                    "success": False,
                    "message": "Production ID is required."
                }, status=status.HTTP_400_BAD_REQUEST)

            instance = FabricationProduction.objects.get(pk=production_id)
            serializer = self.get_serializer(instance, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({
                    "success": True,
                    "message": "Fabrication production data updated successfully.",
                    "data": serializer.data
                }, status=status.HTTP_200_OK)
            return JsonResponse({
                "success": False,
                "message": "Validation failed.",
                "errors": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        except FabricationProduction.DoesNotExist:
            return JsonResponse({
                "success": False,
                "message": "Fabrication production record not found."
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return JsonResponse({
                "success": False,
                "message": "Error updating fabrication production data.",
                "errors": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete_fabrication_production(self, request, *args, **kwargs):
        """
        Delete a fabrication production record.
        """
        try:
            production_id = request.GET.get('id')
            if not production_id:
                return JsonResponse({
                    "success": False,
                    "message": "Production ID is required."
                }, status=status.HTTP_400_BAD_REQUEST)

            instance = FabricationProduction.objects.get(pk=production_id)
            instance.delete()
            return JsonResponse({
                "success": True,
                "message": "Fabrication production data deleted successfully."
            }, status=status.HTTP_204_NO_CONTENT)
        except FabricationProduction.DoesNotExist:
            return JsonResponse({
                "success": False,
                "message": "Fabrication production record not found."
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return JsonResponse({
                "success": False,
                "message": "Error deleting fabrication production data.",
                "errors": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get_fabrication_production_by_date(self, request, *args, **kwargs):
        """
        Retrieve fabrication production records by production date.
        """
        try:
            production_date = request.GET.get('date')
            if not production_date:
                return JsonResponse({
                    "success": False,
                    "message": "Production date is required."
                }, status=status.HTTP_400_BAD_REQUEST)

            records = FabricationProduction.objects.filter(production_date=production_date)
            if not records.exists():
                return JsonResponse({
                    "success": False,
                    "message": "No fabrication production records found for this date."
                }, status=status.HTTP_404_NOT_FOUND)

            serializer = self.get_serializer(records, many=True)
            return JsonResponse({
                "success": True,
                "message": "Fabrication production data retrieved successfully.",
                "data": serializer.data
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return JsonResponse({
                "success": False,
                "message": "Error retrieving fabrication production data by date.",
                "errors": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
