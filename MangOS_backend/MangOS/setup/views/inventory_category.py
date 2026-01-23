
from django.shortcuts import render
from rest_framework import viewsets
from setup.serializers.inventory_category_serializers import CreateInventoryCategorySerializer,InventoryCategorySerializer
from setup.models import InventoryCategory
from rest_framework import viewsets
from rest_framework import status

from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from datetime import datetime, timedelta
# Create your views here.



#------------------------------------Organizations---------------------------------------------------------------------



class InventoryCategoryViewSet(viewsets.ModelViewSet):

    serializer_class = CreateInventoryCategorySerializer
    
    def add_inventory_category(self, request):

        try:
            obj = InventoryCategory()
            serializer = CreateInventoryCategorySerializer(obj, data= request.data)

            if serializer.is_valid():
                response = serializer.save()
                return JsonResponse({
                    "success": True,
                    "status": status.HTTP_201_CREATED,                
                    "message": "Inventory category added successfully",
                    "data": {
                        'id' : response.id
                    }
                })
            else:
                return JsonResponse({
                    "success": False,
                    "status": status.HTTP_400_BAD_REQUEST, 
                    "message": "Invalid field",
                    "errors": serializer.errors
                    })

        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_400_BAD_REQUEST, 
                "message": "Failed to add inventory category",
                "errors": str(e)
            })



    def get_Inventory_category_details(self ,request):
        try:
            inventory = InventoryCategory.objects.all()
            serializer = CreateInventoryCategorySerializer(inventory, many=True)
            return JsonResponse({
                        "success": True,
                        "status": status.HTTP_200_OK,                
                        "message": "Inventory Details got successfully",
                        "data": {
                            'Inventory Details' : serializer.data
                        }
                        }) 
        except Exception as e:
                    return JsonResponse({
                            "success": False,
                            "status": status.HTTP_400_BAD_REQUEST, 
                            "message": "Failed to get Inventory Details",
                            "errors": str(e)
                            })
        


    def update_inventory_category_details(self, request):
        try: 
            inventory = InventoryCategory.objects.get(id=request.data['id'])
            serializer = CreateInventoryCategorySerializer(inventory, data=request.data)

            if serializer.is_valid():
                serializer.save()
                return JsonResponse({
                    "success": True,
                    "status": status.HTTP_200_OK,
                    "message": "inventory category updated successfully",
                    "data": {
                        "Inventory category": serializer.data
                    }
                })
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except InventoryCategory.DoesNotExist:
             return JsonResponse({
                  "success" : False,
                  "status" : status.HTTP_404_NOT_FOUND,
                  "message" : "inventory category not found",
                  "data" : {}
            })
        
    

    def delete_inventory_category_details(self, request):
        try:
            inventory_category_id = request.GET.get('inventory_category_id')
            inventory = InventoryCategory.objects.get(id=inventory_category_id)
            inventory.delete()
            return JsonResponse({
                    "success": True,
                    "status": status.HTTP_200_OK,
                    "message": "Inventory Category deleted successfully",
                })
        except InventoryCategory.DoesNotExist:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_404_NOT_FOUND,
                "message": "Inventory Category not found",
            })    

        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Failed to delete Inventory Category",
                "errors": str(e),
            })     
      
      
      
      
      
      
class InventoryListView(viewsets.ModelViewSet):
    queryset = InventoryCategory.objects.prefetch_related('items').all()  
    serializer_class = InventoryCategorySerializer

    def get_all_inventory(self, request, *args, **kwargs):
        try:
            categories = self.get_queryset()
            serializer = self.get_serializer(categories, many=True)
            return Response({
                "success": True,
                "status": status.HTTP_200_OK,
                "message": "Inventory categories with items retrieved successfully",
                "data": serializer.data
            })
        except Exception as e:
            return Response({
                "success": False,
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "Failed to retrieve inventory data",
                "errors": str(e)
            })      
      
      
      
      
            