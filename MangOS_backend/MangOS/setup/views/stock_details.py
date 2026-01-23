from setup.models import StockDetails , Project
from setup.serializers.stock_details_serializers import StockDetailsSerializer
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.http import JsonResponse
from datetime import datetime, timedelta

class StockDetailsViewset(viewsets.ModelViewSet):
    serializer_class = StockDetailsSerializer

    def get_details(self, request):
        try:
            stock = StockDetails.objects.all()
            serializer = StockDetailsSerializer(stock, many=True)
            return JsonResponse({
                "success": True,
                "status": status.HTTP_200_OK,
                "message": "Stock details retrieved successfully",
                "data": {
                    'stock_items': serializer.data
                }
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "Failed to retrieve stock details",
                "errors": str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

    def get_by_id(self, request):
        try:
            stock_id = request.GET.get("id")
            if not stock_id:
                return JsonResponse({
                    "success": False,
                    "status": status.HTTP_400_BAD_REQUEST,
                    "message": "Stock ID is required"
                }, status=status.HTTP_400_BAD_REQUEST)

            stock = StockDetails.objects.get(id=stock_id)
            serializer = StockDetailsSerializer(stock)
            return JsonResponse({
                "success": True,
                "status": status.HTTP_200_OK,
                "message": "Stock details retrieved successfully",
                "data": {
                    "stock_item": serializer.data
                }
            }, status=status.HTTP_200_OK)

        except StockDetails.DoesNotExist:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_404_NOT_FOUND,
                "message": "Stock item not found",
                "errors": f"Stock item with ID {stock_id} does not exist"
            }, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "Failed to retrieve stock details",
                "errors": str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

    def add_stock(self, request):
        try:
            movement_id = request.data.get("movement")
            if not movement_id:
                return JsonResponse({
                    "success": False,
                    "status": status.HTTP_400_BAD_REQUEST,
                    "message": "Movement ID is required"
                }, status=status.HTTP_400_BAD_REQUEST)

            serializer = StockDetailsSerializer(data=request.data)
            if serializer.is_valid():
                response = serializer.save()
                return JsonResponse({
                    "success": True,
                    "status": status.HTTP_201_CREATED,
                    "message": "Stock added successfully",
                    "data": {
                        'id': response.id
                    }
                }, status=status.HTTP_201_CREATED)
            else:
                return JsonResponse({
                    "success": False,
                    "status": status.HTTP_400_BAD_REQUEST,
                    "message": "Invalid data",
                    "errors": serializer.errors
                }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "Failed to add stock",
                "errors": str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

    def update_stock(self, request):
        try:
            stock_id = request.data.get("id")
            if not stock_id:
                return JsonResponse({
                    "success": False,
                    "status": status.HTTP_400_BAD_REQUEST,
                    "message": "Stock ID is required"
                }, status=status.HTTP_400_BAD_REQUEST)

            stock = StockDetails.objects.get(id=stock_id)
            serializer = StockDetailsSerializer(stock, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({
                    "success": True,
                    "status": status.HTTP_200_OK,
                    "message": "Stock updated successfully",
                    "data": {
                        "stock": serializer.data
                    }
                }, status=status.HTTP_200_OK)
            else:
                return JsonResponse({
                    "success": False,
                    "status": status.HTTP_400_BAD_REQUEST,
                    "message": "Invalid data",
                    "errors": serializer.errors
                }, status=status.HTTP_400_BAD_REQUEST)
        except StockDetails.DoesNotExist:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_404_NOT_FOUND,
                "message": "Stock item not found",
                "data": {}
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "Failed to update stock",
                "errors": str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

    def delete_stock(self, request):
        try:
            stock_id = request.GET.get("id")
            if not stock_id:
                return JsonResponse({
                    "success": False,
                    "status": status.HTTP_400_BAD_REQUEST,
                    "message": "Stock ID is required"
                }, status=status.HTTP_400_BAD_REQUEST)

            stock = StockDetails.objects.get(id=stock_id)
            stock.delete()
            return JsonResponse({
                "success": True,
                "status": status.HTTP_200_OK,
                "message": "Stock deleted successfully"
            }, status=status.HTTP_200_OK)
        except StockDetails.DoesNotExist:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_404_NOT_FOUND,
                "message": "Stock item not found"
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Failed to delete stock",
                "errors": str(e),
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            
            
            
            
            
            
            
            
    def get_stock_details_by_inventory_id(self, request):
      try:
          inventory_id = request.GET.get("inventory_id")
          if not inventory_id:
              return JsonResponse({
                  "success": False,
                  "status": status.HTTP_400_BAD_REQUEST,
                  "message": "Stock ID is required"
              }, status=status.HTTP_400_BAD_REQUEST)
  
          stock = StockDetails.objects.filter(inventory=inventory_id)
          if not stock.exists():
              return JsonResponse({
                  "success": False,
                  "status": status.HTTP_404_NOT_FOUND,
                  "message": "No stock details found for the given inventory ID"
              }, status=status.HTTP_404_NOT_FOUND)
  
          stock_data = []
          for s in stock:
              serialized = StockDetailsSerializer(s).data
              serialized["project_name"] = s.project.name  # Add project name manually
              stock_data.append(serialized)
  
          return JsonResponse({
              "success": True,
              "status": status.HTTP_200_OK,
              "message": "Stock details retrieved successfully",
              "data": {
                  "stock_item": stock_data
              }
          }, status=status.HTTP_200_OK)
  
      except Exception as e:
          return JsonResponse({
              "success": False,
              "status": status.HTTP_400_BAD_REQUEST,
              "message": "Failed to retrieve stock details",
              "errors": str(e)
          }, status=status.HTTP_400_BAD_REQUEST)         
            
            
