from rest_framework import viewsets, status
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.db.models import Sum
from mis_app.models import Cost
from collections import OrderedDict
from mis_app.serializers.cost_serializers import CostSerializer

class CostViewSet(viewsets.ViewSet):
    """
    A simple ViewSet for basic CRUD operations on Cost.
    """

    def list_costs(self, request):
      try:
          costs = Cost.objects.all().order_by('cost_date')
          serializer = CostSerializer(costs, many=True)
  
          monthly_data = OrderedDict()
  
          for item in serializer.data:
              month_str = item["cost_date"][:7]  # 'YYYY-MM'
              cost_value = float(item["cost_value"] or 0)
  
              if month_str not in monthly_data:
                  monthly_data[month_str] = {
                      "total_cost": 0,
                      "records": []
                  }
  
              monthly_data[month_str]["records"].append(item)
              monthly_data[month_str]["total_cost"] += cost_value
  
          # Format totals
          for month in monthly_data:
              monthly_data[month]["total_cost"] = round(monthly_data[month]["total_cost"], 2)
  
          return JsonResponse({
              "success": True,
              "status": status.HTTP_200_OK,
              "message": "Monthly grouped cost data retrieved successfully.",
              "monthly_data": monthly_data
          }, status=status.HTTP_200_OK)
  
      except Exception as e:
          return JsonResponse({
              "success": False,
              "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
              "message": "Error retrieving costs.",
              "errors": str(e)
          })

    def create_cost(self, request):
        try:
            serializer = CostSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({
                    "success": True,
                    "status": status.HTTP_201_CREATED,
                    "message": "Cost created successfully.",
                    "data": serializer.data
                })
            return JsonResponse({
                "success": False,
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "Invalid data.",
                "errors": serializer.errors
            })
        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Error creating cost.",
                "errors": str(e)
            })

    def update_cost(self, request):
        try:
            cost_id = request.GET.get('id')
            if not cost_id:
                return JsonResponse({
                    "success": False,
                    "status": status.HTTP_400_BAD_REQUEST,
                    "message": "Cost ID is required."
                })

            cost = get_object_or_404(Cost, id=cost_id)
            serializer = CostSerializer(cost, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({
                    "success": True,
                    "status": status.HTTP_200_OK,
                    "message": "Cost updated successfully.",
                    "data": serializer.data
                })
            return JsonResponse({
                "success": False,
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "Invalid data.",
                "errors": serializer.errors
            })
        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Error updating cost.",
                "errors": str(e)
            })

    def delete_cost(self, request):
        try:
            cost_id = request.GET.get('id')
            if not cost_id:
                return JsonResponse({
                    "success": False,
                    "status": status.HTTP_400_BAD_REQUEST,
                    "message": "Cost ID is required."
                })

            cost = get_object_or_404(Cost, id=cost_id)
            cost.delete()
            return JsonResponse({
                "success": True,
                "status": status.HTTP_200_OK,
                "message": "Cost deleted successfully."
            })
        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Error deleting cost.",
                "errors": str(e)
            })

    def retrieve_cost_by_id(self, request):
        try:
            cost_id = request.GET.get('id')
            if not cost_id:
                return JsonResponse({
                    "success": False,
                    "status": status.HTTP_400_BAD_REQUEST,
                    "message": "Cost ID is required."
                })

            cost = get_object_or_404(Cost, id=cost_id)
            serializer = CostSerializer(cost)
            return JsonResponse({
                "success": True,
                "status": status.HTTP_200_OK,
                "message": "Cost retrieved successfully.",
                "data": serializer.data
            })
        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Error retrieving cost by ID.",
                "errors": str(e)
            })

    def retrieve_cost_by_project(self, request):
        try:
            project_name = request.GET.get('name')
            if not project_name:
                return JsonResponse({
                    "success": False,
                    "status": status.HTTP_400_BAD_REQUEST,
                    "message": "Project name is required."
                })

            costs = Cost.objects.filter(project__name=project_name)
            if not costs.exists():
                return JsonResponse({
                    "success": False,
                    "status": status.HTTP_404_NOT_FOUND,
                    "message": f"No project found with name '{project_name}'."
                })

            serializer = CostSerializer(costs, many=True)
            return JsonResponse({
                "success": True,
                "status": status.HTTP_200_OK,
                "message": "Costs by project retrieved successfully.",
                "data": serializer.data
            })

        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Error retrieving costs by project.",
                "errors": str(e)
            })


    def get_total_cost_value(self, request):
        try:
            total = Cost.objects.aggregate(total_value=Sum('cost_value'))
            return JsonResponse({
                "success": True,
                "status": status.HTTP_200_OK,
                "message": "Total cost value calculated successfully.",
                "data": total
            })
        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Error calculating total cost.",
                "errors": str(e)
            })

    def retrieve_cost_by_date(self, request):
        try:
            date = request.GET.get('cost_date')
            if not date:
                return JsonResponse({
                    "success": False,
                    "status": status.HTTP_400_BAD_REQUEST,
                    "message": "Cost date is required."
                })

            costs = Cost.objects.filter(cost_date=date)
            serializer = CostSerializer(costs, many=True)
            return JsonResponse({
                "success": True,
                "status": status.HTTP_200_OK,
                "message": "Costs by date retrieved successfully.",
                "data": serializer.data
            })
        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Error retrieving costs by date.",
                "errors": str(e)
            })
