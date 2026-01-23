from rest_framework import viewsets, status
from django.http import JsonResponse
from django.db.models import Sum
from mis_app.models import DailyCostBreakdown
from mis_app.serializers.Daily_cost_serializers import DailyCostBreakdownSerializer

class DailyCostViewSet(viewsets.ModelViewSet):
    serializer_class = DailyCostBreakdownSerializer

    def get_daily_cost(self, request):
        try:
            daily_cost = DailyCostBreakdown.objects.all()
            serializer = self.get_serializer(daily_cost, many=True)
            return JsonResponse({
                "success": True,
                "status": status.HTTP_200_OK,
                "message": "Daily costs retrieved successfully.",
                "data": serializer.data
            })
        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Error retrieving daily costs.",
                "errors": str(e)
            })

    def add_daily_cost(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({
                    "success": True,
                    "status": status.HTTP_201_CREATED,
                    "message": "Daily cost created successfully.",
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
                "message": "Error creating daily cost.",
                "errors": str(e)
            })

    def update_daily_cost(self, request):
        try:
            daily_cost = request.GET.get('id')
            if not daily_cost:
                return JsonResponse({
                    "success": False,
                    "status": status.HTTP_400_BAD_REQUEST,
                    "message": "ID parameter is required."
                })
            instance = DailyCostBreakdown.objects.get(id=daily_cost)
            if not instance:
                return JsonResponse({
                    "success": False,
                    "status": status.HTTP_404_NOT_FOUND,
                    "message": "Daily cost not found."
                })
            serializer = self.get_serializer(instance, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({
                    "success": True,
                    "status": status.HTTP_200_OK,
                    "message": "Daily cost updated successfully.",
                    "data": serializer.data
                })
            return JsonResponse({
                "success": False,
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "Validation failed.",
                "errors": serializer.errors
            })
        except DailyCostBreakdown.DoesNotExist:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_404_NOT_FOUND,
                "message": "Daily cost not found."
            })
        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Error updating daily cost.",
                "errors": str(e)
            })

    def delete_daily_cost(self, request):
        try:
            daily_cost_id = request.GET.get('id')
            if not daily_cost_id:
                return JsonResponse({
                    "success": False,
                    "status": status.HTTP_400_BAD_REQUEST,
                    "message": "ID parameter is required."
                })

            instance = DailyCostBreakdown.objects.get(id=daily_cost_id)
            instance.delete()
            return JsonResponse({
                "success": True,
                "status": status.HTTP_204_NO_CONTENT,
                "message": "Daily cost deleted successfully."
            })
        except DailyCostBreakdown.DoesNotExist:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_404_NOT_FOUND,
                "message": "Daily cost not found."
            })
        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Error deleting daily cost.",
                "errors": str(e)
            })

    def get_daily_total_cost(self, request, *args, **kwargs):
        try:
            total_cost = DailyCostBreakdown.objects.aggregate(total=Sum('cost'))
            return JsonResponse({
                "success": True,
                "status": status.HTTP_200_OK,
                "message": "Total daily cost calculated successfully.",
                "data": total_cost
            })
        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Error calculating total cost.",
                "errors": str(e)
            })


    def get_daily_units_consumed(self, request, *args, **kwargs):
        try:
            total_units = DailyCostBreakdown.objects.aggregate(units=Sum('unit_consumed'))
            return JsonResponse({
                "success": True,
                "status": status.HTTP_200_OK,
                "message": "Total units consumed retrieved successfully.",
                "data": total_units
            })
        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Error retrieving units consumed.",
                "errors": str(e)
            })
