

from django.shortcuts import render
from rest_framework import viewsets
from setup.serializers.inventory_item_serializers import CreateInventoryItemSerializer
from setup.models import InventoryItem , Project
from rest_framework import viewsets
from rest_framework import status

from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from datetime import datetime, timedelta
# Create your views here.



#------------------------------------Organizations---------------------------------------------------------------------



class InventoryItemViewSet(viewsets.ModelViewSet):

    serializer_class = CreateInventoryItemSerializer
    
    def add_inventory_item(self, request):
      try:
          obj = InventoryItem()
          serializer = CreateInventoryItemSerializer(obj, data=request.data)
  
          if serializer.is_valid():
              # Adding project connection
              project_id = request.data.get('project_id')  # Get project ID from request
              if project_id:
                  try:
                      project = Project.objects.get(id=project_id)
                      serializer.validated_data['project'] = project  # Connect the project
                  except Project.DoesNotExist:
                      return JsonResponse({
                          "success": False,
                          "status": status.HTTP_400_BAD_REQUEST, 
                          "message": "Project not found"
                      })
              response = serializer.save()
              return JsonResponse({
                  "success": True,
                  "status": status.HTTP_201_CREATED,                
                  "message": "Inventory item added successfully",
                  "data": {
                      'id': response.id
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
              "message": "Failed to add inventory item",
              "errors": str(e)
          })



    def get_inventory_item_details(self ,request):
        try:
            inventory = InventoryItem.objects.all()
            serializer = CreateInventoryItemSerializer(inventory, many=True)
            return JsonResponse({
                        "success": True,
                        "status": status.HTTP_200_OK,                
                        "message": "Inventory item got successfully",
                        "data": {
                            'Inventory item' : serializer.data
                        }
                        }) 
        except Exception as e:
                    return JsonResponse({
                            "success": False,
                            "status": status.HTTP_400_BAD_REQUEST, 
                            "message": "Failed to get inventory item",
                            "errors": str(e)
                            })
       
       
       
    def get_inventory_item_name(self ,request):
        try:
            inventory = list(InventoryItem.objects.values('item_name','id'))
            return JsonResponse({
                "success": True,
                "status": status.HTTP_200_OK,                
                "message": "Inventory item got successfully",
                "data": {
                    'Inventory item': inventory
                }
            }) 
        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_400_BAD_REQUEST, 
                "message": "Failed to get inventory item",
                "errors": str(e)
            })      
       
       
       
       
    def get_inventory_item_by_inventory_category_id(self ,request):
        try:
            ids = request.GET.get('category_id')
            categories = InventoryItem.objects.filter(category=ids).all()
            serializer = CreateInventoryItemSerializer(categories, many=True)
            return JsonResponse({
                        "success": True,
                        "status": status.HTTP_200_OK,                
                        "message": "Inventory item got successfully",
                        "data": {
                            'inventory_item' : serializer.data
                        }
                        }) 
        except Exception as e:
                    return JsonResponse({
                            "success": False,
                            "status": status.HTTP_400_BAD_REQUEST, 
                            "message": "Failed to get inventory item",
                            "errors": str(e)
                            })       
       
       
        


    def update_inventory_item_details(self, request):
      try:
          # Safely get ID from either request.data or request.GET
          item_id = request.data.get('id') or request.GET.get('id')
          if not item_id:
              return JsonResponse({
                  "success": False,
                  "status": status.HTTP_400_BAD_REQUEST,
                  "message": "Missing 'id' in request data or query parameters.",
              })
  
          # Attempt to retrieve the inventory item
          inventory = InventoryItem.objects.get(id=item_id)
  
          # Perform serialization and update
          serializer = CreateInventoryItemSerializer(inventory, data=request.data, partial=True)
          if serializer.is_valid():
              updated_inventory = serializer.save()
  
              # Handle the association with projects if any project_ids are passed
              project_ids = request.data.get('project_ids')
              if project_ids:
                  projects = Project.objects.filter(id__in=project_ids)
                  updated_inventory.projects.set(projects)  # Using set() to associate projects
  
              return JsonResponse({
                  "success": True,
                  "status": status.HTTP_200_OK,
                  "message": "Inventory item updated successfully",
                  "data": {
                      "inventory_item": serializer.data
                  }
              })
          
          return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
      except InventoryItem.DoesNotExist:
          return JsonResponse({
              "success": False,
              "status": status.HTTP_404_NOT_FOUND,
              "message": "Inventory item not found",
          })
  
      except Exception as e:
          return JsonResponse({
              "success": False,
              "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
              "message": "An error occurred while updating the inventory item",
              "error": str(e)
          })
    
      except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "An error occurred while updating the inventory item",
                "error": str(e)
            })
        
    

    def delete_inventory_item_details(self, request):
        try:
            inventory_item_id = request.GET.get('id')
            inventory = InventoryItem.objects.get(id=inventory_item_id)
            inventory.delete()
            return JsonResponse({
                    "success": True,
                    "status": status.HTTP_200_OK,
                    "message": "Inventory item deleted successfully",
                })
        except InventoryItem.DoesNotExist:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_404_NOT_FOUND,
                "message": "Inventory item not found",
            })    

        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Failed to delete Inventory item",
                "errors": str(e),
            })
            
    def get_inventory_item_by_item_master_id(self, request):
      try:
          item_master_id = request.GET.get('item_master_id')
  
          if not item_master_id:
              return JsonResponse({
                  "success": False,
                  "status": status.HTTP_400_BAD_REQUEST,
                  "message": "Missing 'item_master_id' parameter."
              })
  
          inventory_item = InventoryItem.objects.filter(item_id=item_master_id).first()
  
          if not inventory_item:
              return JsonResponse({
                  "success": False,
                  "status": status.HTTP_404_NOT_FOUND,
                  "message": "No inventory item found for the given item_master_id."
              })
  
          data = {
              "category": inventory_item.category.id if inventory_item.category else None,
              "item_name": inventory_item.item_name,
              "item_code": inventory_item.item_code
          }
  
          return JsonResponse({
              "success": True,
              "status": status.HTTP_200_OK,
              "message": "Inventory item fetched successfully.",
              "data": data
          })
  
      except Exception as e:
          return JsonResponse({
              "success": False,
              "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
              "message": "Failed to fetch inventory item by item_master_id",
              "errors": str(e)
          })     
              