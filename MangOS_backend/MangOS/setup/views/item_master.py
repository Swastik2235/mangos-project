from django.shortcuts import render
from rest_framework import viewsets
from setup.serializers.item_master_serializers import ItemMasterSerializer
from setup.models import ItemMaster , InventoryItem , InventoryCategory
from rest_framework import viewsets
from rest_framework import status
import json
from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from datetime import datetime, timedelta
from django.shortcuts import get_object_or_404



class ItemMasterViewset(viewsets.ModelViewSet):
    serializer_class = ItemMasterSerializer

    def get_item_master(self,request):
        
            item_master = ItemMaster.objects.all()
            serializer = ItemMasterSerializer(item_master, many=True)
            return JsonResponse({
                "success": True,
                "status": status.HTTP_200_OK,                
                "message": "item master got successfully",
                "data": {
                        'item Master' : serializer.data
                }
            })
        
        
    def add_item_master(self, request):
      try:
          obj = ItemMaster()
          serializer = ItemMasterSerializer(obj, data=request.data)
  
          if serializer.is_valid():
              item = serializer.save()
  
              # You'll need to extract or generate the required inventory fields
              item_name = item.name
              item_code = f"ITEM{item.id:05d}"  # simple auto-code example like ITEM00001
  
              # Get or assign a default InventoryCategory
              default_category = InventoryCategory.objects.first()
              if not default_category:
                  return JsonResponse({
                      "success": False,
                      "status": status.HTTP_400_BAD_REQUEST,
                      "message": "No inventory category available to assign."
                  })
  
              InventoryItem.objects.create(
                  item_id=item,
                  category=default_category,
                  item_name=item_name,
                  item_code=item_code,
                  quantity_available_kg=0,
                  quantity_available_pc=0
              )
  
              return JsonResponse({
                  "success": True,
                  "status": status.HTTP_201_CREATED,
                  "message": "Item Master and Inventory item added successfully",
                  "data": {
                      'id': item.id,
                      'item_code': item_code
                  }
              })
  
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
              "message": "Failed to add item Master",
              "errors": str(e)
          })
        
    def update_item_master(self, request):
      try:
          item_id = request.GET.get("id")
          if not item_id:
              return JsonResponse({
                  "success": False,
                  "status": status.HTTP_400_BAD_REQUEST,
                  "message": "Missing 'id' in query parameters.",
                  "data": {}
              })
  
          item = ItemMaster.objects.get(id=item_id)
          serializer = ItemMasterSerializer(item, data=request.data, partial=True)
  
          if serializer.is_valid():
              serializer.save()
              return JsonResponse({
                  "success": True,
                  "status": status.HTTP_200_OK,
                  "message": "Item master updated successfully",
                  "data": {
                      "item_master": serializer.data
                  }
              })
  
          return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
      except ItemMaster.DoesNotExist:
          return JsonResponse({
              "success": False,
              "status": status.HTTP_404_NOT_FOUND,
              "message": "Item master not found",
              "data": {}
          })
        
    

    def delete_item_master(self,request):
      try:
          item_id = request.GET.get("item_id")
  
          # Check if item_id is missing
          if not item_id:
              return JsonResponse({
                  "success": False,
                  "status": 400,
                  "message": "Missing item_id parameter."
              })
  
          # Validate item_id is a valid integer
          try:
              item_id = int(item_id)
          except ValueError:
              return JsonResponse({
                  "success": False,
                  "status": 400,
                  "message": "Invalid item_id format. Must be an integer."
              })
  
          # Fetch and delete item
          item = get_object_or_404(ItemMaster, id=item_id)
          item.delete()
  
          return JsonResponse({
              "success": True,
              "status": status.HTTP_200_OK,
              "message": "Item master deleted successfully."
          })
  
      except Exception as e:
          return JsonResponse({
              "success": False,
              "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
              "message": "Failed to delete item master.",
              "errors": str(e),
          })
          
    def get_item_name(self, request):
      try:
          items = ItemMaster.objects.all().values('id', 'name')
          return JsonResponse({
              "success": True,
              "status": status.HTTP_200_OK,
              "message": "Item names retrieved successfully",
              "data": list(items)
          })
      except Exception as e:
          return JsonResponse({
              "success": False,
              "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
              "message": "Failed to retrieve item names",
              "errors": str(e)
          })
            