from rest_framework import viewsets, status
from django.db.models import Sum
from django.http import JsonResponse
from mis_app.models import CriticalCostParameters
from mis_app.serializers.critical_cost_serializer import CriticalCostSerializer
from collections import OrderedDict

class CriticalCostViewSet(viewsets.ModelViewSet):
    serializer_class = CriticalCostSerializer

    def get_critical_cost(self, request):
      """
      Retrieve critical cost parameters with monthly grouping and totals.
      """
      try:
          critical_costs = CriticalCostParameters.objects.all().order_by('production_date')
          serializer = self.get_serializer(critical_costs, many=True)
  
          overall_qty = 0
          overall_value = 0
          monthly_data = OrderedDict()
  
          for item in serializer.data:
              month_str = item['production_date'][:7]  # 'YYYY-MM'
              qty = float(item.get('daily_total_mt') or 0)
              value = float(item.get('daily_total_value') or 0)
  
              if month_str not in monthly_data:
                  monthly_data[month_str] = {
                      "total_quantity_mt": 0,
                      "total_value": 0,
                      "average_rate_per_mt": 0,
                      "records": []
                  }
  
              monthly_data[month_str]['total_quantity_mt'] += qty
              monthly_data[month_str]['total_value'] += value
              monthly_data[month_str]['records'].append(item)
  
              overall_qty += qty
              overall_value += value
  
          for month in monthly_data:
              qty = monthly_data[month]["total_quantity_mt"]
              val = monthly_data[month]["total_value"]
              monthly_data[month]["total_quantity_mt"] = round(qty, 2)
              monthly_data[month]["total_value"] = round(val, 2)
              monthly_data[month]["average_rate_per_mt"] = round(val / qty, 2) if qty else 0
  
          rate_for_month = overall_value / overall_qty if overall_qty else 0
  
          return JsonResponse({
              "success": True,
              "status": status.HTTP_200_OK,
              "message": "Critical costs retrieved successfully.",
              "overall_totals": {
                  "total_quantity_mt": round(overall_qty, 2),
                  "average_rate_per_mt": round(rate_for_month, 2),
                  "total_value": round(overall_value, 2)
              },
              "monthly_data": monthly_data
          }, status=status.HTTP_200_OK)
  
      except Exception as e:
          return JsonResponse({
              "success": False,
              "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
              "message": "Error retrieving critical costs.",
              "errors": str(e)
          })

    def add_critical_cost(self, request):
        try:
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({
                    "success": True,
                    "status": status.HTTP_201_CREATED,
                    "message": "Critical cost added successfully.",
                    "data": serializer.data
                })
            return JsonResponse({
                "success": False,
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "Validation failed.",
                "errors": serializer.errors
            })
        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Error adding critical cost.",
                "errors": str(e)
            })

    def update_critical_cost(self, request):
        try:
            critical_cost = request.GET.get('id')
            if not critical_cost:
                return JsonResponse({
                    "success": False,
                    "status": status.HTTP_400_BAD_REQUEST,
                    "message": "Critical cost ID is required."
                })
            critical_cost = CriticalCostParameters.objects.get(pk=critical_cost)
            serializer = self.get_serializer(critical_cost, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({
                    "success": True,
                    "status": status.HTTP_200_OK,
                    "message": "Critical cost updated successfully.",
                    "data": serializer.data
                })
            return JsonResponse({
                "success": False,
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "Validation failed.",
                "errors": serializer.errors
            })
        except CriticalCostParameters.DoesNotExist:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_404_NOT_FOUND,
                "message": "Critical cost not found."
            })
        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Error updating critical cost.",
                "errors": str(e)
            })

    def delete_critical_cost(self, request):
        try:
            cost_id = request.GET.get('id')
            if not cost_id:
                return JsonResponse({
                    "success": False,
                    "status": status.HTTP_400_BAD_REQUEST,
                    "message": "Critical cost ID is required."
                })

            critical_cost = CriticalCostParameters.objects.get(pk=cost_id)
            critical_cost.delete()
            return JsonResponse({
                "success": True,
                "status": status.HTTP_204_NO_CONTENT,
                "message": "Critical cost deleted successfully."
            })
        except CriticalCostParameters.DoesNotExist:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_404_NOT_FOUND,
                "message": "Critical cost not found."
            })
        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Error deleting critical cost.",
                "errors": str(e)
            })


    def get_critical_cost_by_type(self, request):
        try:
            cost_category = request.GET.get('cost_category')
            if not cost_category:
                return JsonResponse({
                    "success": False,
                    "status": status.HTTP_400_BAD_REQUEST,
                    "message": "Cost category parameter is required."
                })

            costs = CriticalCostParameters.objects.filter(cost_category=cost_category)
            if not costs.exists():
                return JsonResponse({
                    "success": False,
                    "status": status.HTTP_404_NOT_FOUND,
                    "message": f"No critical costs found for category '{cost_category}'."
                })

            serializer = self.get_serializer(costs, many=True)
            return JsonResponse({
                "success": True,
                "status": status.HTTP_200_OK,
                "message": "Critical costs by type retrieved successfully.",
                "data": serializer.data
            })
        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Error retrieving critical costs by type.",
                "errors": str(e)
            })
