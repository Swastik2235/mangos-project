from rest_framework import viewsets, status
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from mis_app.models import ConsumablesAndWasteCosts
from mis_app.serializers.consumable_costs_serializers import ConsumablesAndWasteCostsSerializer
from django.db.models import Sum

class ConsumablesAndWasteCostsViewSet(viewsets.ModelViewSet):
    serializer_class = ConsumablesAndWasteCostsSerializer

    def get_consumables_and_waste_costs(self, request):
        try:
            costs = ConsumablesAndWasteCosts.objects.all()
            serializer = self.get_serializer(costs, many=True)
            return JsonResponse({
                "success": True,
                "status": status.HTTP_200_OK,
                "message": "Consumables and waste costs retrieved successfully",
                "data": serializer.data
            })
        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Failed to retrieve data",
                "errors": str(e)
            })

    def add_consumables_and_waste_costs(self, request):
        try:
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                instance = serializer.save()
                return JsonResponse({
                    "success": True,
                    "status": status.HTTP_201_CREATED,
                    "message": "Consumable cost added successfully",
                    "data": {"id": instance.id}
                })
            return JsonResponse({
                "success": False,
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "Invalid input",
                "errors": serializer.errors
            })
        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Failed to add data",
                "errors": str(e)
            })

    def update_consumables_and_waste_costs(self, request):
        try:
            cost_id = request.GET.get('id')
            if not cost_id:
                return JsonResponse({
                    "success": False,
                    "status": status.HTTP_400_BAD_REQUEST,
                    "message": "Missing 'id' parameter"
                })

            instance = get_object_or_404(ConsumablesAndWasteCosts, pk=cost_id)
            serializer = self.get_serializer(instance, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return JsonResponse({
                    "success": True,
                    "status": status.HTTP_200_OK,
                    "message": "Consumable cost updated successfully",
                    "data": serializer.data
                })

            return JsonResponse({
                "success": False,
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "Invalid input",
                "errors": serializer.errors
            })

        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Failed to update data",
                "errors": str(e)
            })

    def delete_consumables_and_waste_costs(self, request):
        try:
            cost_id = request.GET.get('id')
            if not cost_id:
                return JsonResponse({
                    "success": False,
                    "status": status.HTTP_400_BAD_REQUEST,
                    "message": "Missing 'id' parameter"
                })

            instance = get_object_or_404(ConsumablesAndWasteCosts, pk=cost_id)
            instance.delete()
            return JsonResponse({
                "success": True,
                "status": status.HTTP_200_OK,
                "message": "Consumable cost deleted successfully"
            })

        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Failed to delete data",
                "errors": str(e)
            })

    def get_total_costs(self, request):
        try:
            total_cost = ConsumablesAndWasteCosts.objects.aggregate(Sum('cost_per_unit'))
            return JsonResponse({
                "success": True,
                "status": status.HTTP_200_OK,
                "message": "Total cost retrieved successfully",
                "data": total_cost
            })
        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Failed to calculate total cost",
                "errors": str(e)
            })

    def get_costs_by_date(self, request):
        try:
            date = request.GET.get('cost_date')
            if not date:
                return JsonResponse({
                    "success": False,
                    "status": status.HTTP_400_BAD_REQUEST,
                    "message": "Date parameter is required"
                })

            costs = ConsumablesAndWasteCosts.objects.filter(cost_date=date).aggregate(Sum('cost_per_unit'))
            return JsonResponse({
                "success": True,
                "status": status.HTTP_200_OK,
                "message": "Costs by date retrieved successfully",
                "data": costs
            })

        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Failed to retrieve costs by date",
                "errors": str(e)
            })

    def get_cost_by_type(self, request):
        try:
            cost_type = request.GET.get('cost_type')
            if not cost_type:
                return JsonResponse({
                    "success": False,
                    "status": status.HTTP_400_BAD_REQUEST,
                    "message": "Cost type parameter is required"
                })

            costs = ConsumablesAndWasteCosts.objects.filter(cost_type=cost_type).aggregate(Sum('cost_per_unit'))
            return JsonResponse({
                "success": True,
                "status": status.HTTP_200_OK,
                "message": "Costs by type retrieved successfully",
                "data": costs
            })

        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Failed to retrieve costs by type",
                "errors": str(e)
            })
