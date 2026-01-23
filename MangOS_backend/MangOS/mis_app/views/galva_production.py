from django.http import JsonResponse
from django.db.models import Sum
from rest_framework import viewsets, status
from mis_app.models import GalvanizingProduction
from mis_app.serializers.galvanizing_production_serializers import GalvanizingProductionSerializer
from django.db.models.functions import TruncMonth
from collections import OrderedDict
from datetime import datetime

class GalvaProductionViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling Galvanizing production data.
    """
    serializer_class = GalvanizingProductionSerializer

    def get_galva_production(self, request, *args, **kwargs):
      """
      Get galvanizing production data grouped by month with totals and records.
      """
      try:
          all_records = GalvanizingProduction.objects.all().order_by('production_date')
          monthly_groups = OrderedDict()
  
          # Group by month
          for record in all_records:
              month_str = record.production_date.strftime('%Y-%m')
              if month_str not in monthly_groups:
                  monthly_groups[month_str] = {
                      "records": [],
                      "total_quantity_mt": 0,
                      "total_value": 0
                  }
  
              # Track totals
              monthly_groups[month_str]["records"].append(record)
              monthly_groups[month_str]["total_quantity_mt"] += float(record.daily_total_mt or 0)
              monthly_groups[month_str]["total_value"] += float(record.daily_total_value or 0)
  
          # Build response with serialized records
          final_data = OrderedDict()
          for month, data in monthly_groups.items():
              total_qty = data["total_quantity_mt"]
              total_value = data["total_value"]
              rate = total_value / total_qty if total_qty else 0
  
              serializer = self.get_serializer(data["records"], many=True)
              final_data[month] = {
                  "totals": {
                      "total_quantity_mt": f"{total_qty:.2f}",
                      "total_value": f"{total_value:.2f}",
                      "average_rate_per_mt": f"{rate:.2f}"
                  },
                  "records": serializer.data
              }
  
          return JsonResponse({
              "success": True,
              "message": "Galvanizing production data retrieved successfully.",
              "monthly_data": final_data
          }, status=status.HTTP_200_OK)
  
      except Exception as e:
          return JsonResponse({
              "success": False,
              "message": "Error retrieving galvanizing production data.",
              "errors": str(e)
          }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def add_galva_production(self, request, *args, **kwargs):
        """
        Add new galvanizing production data.
        """
        try:
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({
                    "status": "success",
                    "message": "Galvanizing production data added successfully.",
                    "data": serializer.data
                }, status=status.HTTP_201_CREATED)
            return JsonResponse({
                "status": "error",
                "message": "Invalid data",
                "errors": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return JsonResponse({
                "status": "error",
                "message": f"An error occurred while adding data: {str(e)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def update_galva_production(self, request, *args, **kwargs):
        """
        Update existing galvanizing production data using GET for the ID.
        """
        try:
            # Use GET to fetch the ID
            galva_id = request.GET.get('production_id')
            if not galva_id:
                return JsonResponse({
                    "status": "error",
                    "message": "Production ID is required."
                }, status=status.HTTP_400_BAD_REQUEST)

            try:
                galva_production = GalvanizingProduction.objects.get(pk=galva_id)
            except GalvanizingProduction.DoesNotExist:
                return JsonResponse({
                    "status": "error",
                    "message": "Galvanizing production data not found."
                }, status=status.HTTP_404_NOT_FOUND)

            serializer = self.get_serializer(galva_production, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({
                    "status": "success",
                    "message": "Galvanizing production data updated successfully.",
                    "data": serializer.data
                }, status=status.HTTP_200_OK)
            return JsonResponse({
                "status": "error",
                "message": "Invalid data",
                "errors": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return JsonResponse({
                "status": "error",
                "message": f"An error occurred while updating data: {str(e)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def delete_galva_production(self, request, *args, **kwargs):
        """
        Delete galvanizing production data using GET for the ID.
        """
        try:
            galva_id = request.GET.get('production_id')
            if not galva_id:
                return JsonResponse({
                    "status": "error",
                    "message": "Production ID is required."
                }, status=status.HTTP_400_BAD_REQUEST)

            try:
                galva_production = GalvanizingProduction.objects.get(pk=galva_id)
            except GalvanizingProduction.DoesNotExist:
                return JsonResponse({
                    "status": "error",
                    "message": "Galvanizing production data not found."
                }, status=status.HTTP_404_NOT_FOUND)

            galva_production.delete()
            return JsonResponse({
                "status": "success",
                "message": "Galvanizing production data deleted successfully."
            }, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return JsonResponse({
                "status": "error",
                "message": f"An error occurred while deleting data: {str(e)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def get_galva_by_date(self, request, *args, **kwargs):
        """
        Get galvanizing production data by date.
        """
        try:
            date = request.GET.get('production_date')
            if not date:
                return JsonResponse({
                    "status": "error",
                    "message": "Production date parameter is required."
                }, status=status.HTTP_400_BAD_REQUEST)

            galva_production = GalvanizingProduction.objects.filter(production_date=date)
            if not galva_production:
                return JsonResponse({
                    "status": "error",
                    "message": "No Galvanizing Production data found for this date."
                }, status=status.HTTP_404_NOT_FOUND)

            serializer = self.get_serializer(galva_production, many=True)
            return JsonResponse({
                "status": "success",
                "message": "Galvanizing production data retrieved by date successfully.",
                "data": serializer.data
            }, safe=False, status=status.HTTP_200_OK)
        except Exception as e:
            return JsonResponse({
                "status": "error",
                "message": f"An error occurred while retrieving data: {str(e)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get_galva_by_id(self, request, *args, **kwargs):
        """
        Get galvanizing production data by production ID.
        """
        try:
            galva_id = request.GET.get('production_id')
            if not galva_id:
                return JsonResponse({
                    "status": "error",
                    "message": "Production ID is required."
                }, status=status.HTTP_400_BAD_REQUEST)

            try:
                galva_production = GalvanizingProduction.objects.get(pk=galva_id)
            except GalvanizingProduction.DoesNotExist:
                return JsonResponse({
                    "status": "error",
                    "message": "Galvanizing production data not found."
                }, status=status.HTTP_404_NOT_FOUND)

            serializer = self.get_serializer(galva_production)
            return JsonResponse({
                "status": "success",
                "message": "Galvanizing production data retrieved by ID successfully.",
                "data": serializer.data
            }, safe=False, status=status.HTTP_200_OK)
        except Exception as e:
            return JsonResponse({
                "status": "error",
                "message": f"An error occurred while retrieving data: {str(e)}"
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
