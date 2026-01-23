from rest_framework import viewsets, status
from rest_framework.response import Response
from django.http import JsonResponse
from setup.models import StockMovement , Project , StockDetails
from setup.serializers.stockmovement_serializers import StockMovementSerializer
from django.shortcuts import get_object_or_404
import json
from decimal import Decimal


class StockMovementViewSet(viewsets.ModelViewSet):
    queryset = StockMovement.objects.all()
    serializer_class = StockMovementSerializer

    def get_movement(self, request):
        """Retrieve all stock movements"""
        try:
            stock_movements = StockMovement.objects.all()
            serializer = StockMovementSerializer(stock_movements, many=True)
            return JsonResponse({
                "success": True,
                "status": status.HTTP_200_OK,                
                "message": "Stock movements retrieved successfully",
                "data": {
                    'stock_movements': serializer.data
                }
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_400_BAD_REQUEST, 
                "message": "Failed to retrieve stock movements",
                "errors": str(e)
            }, status=status.HTTP_400_BAD_REQUEST)
    
    
    def add_movement(self, request):
      try:
          data = request.data.copy()
  
          # Validate and get project (if provided)
          project_id = data.get("project_id")
          if project_id:
              project = get_object_or_404(Project, id=project_id)
              data["project"] = project.id
  
          # Validate and get previous project (if provided)
          previous_project_id = data.get("previous_project")
          if previous_project_id:
              previous_project = get_object_or_404(Project, id=previous_project_id)
              data["previous_project"] = previous_project.id
  
          serializer = self.get_serializer(data=data)
          if serializer.is_valid():
              movement = serializer.save()
              return JsonResponse({
                  "success": True,
                  "status": status.HTTP_201_CREATED,
                  "message": "Stock movement created successfully!",
                  "data": serializer.data
              }, status=status.HTTP_201_CREATED)
  
          return JsonResponse({
              "success": False,
              "status": status.HTTP_400_BAD_REQUEST,
              "message": "Invalid data",
              "errors": serializer.errors
          }, status=status.HTTP_400_BAD_REQUEST)

      except Exception as e:
        return JsonResponse({
            "success": False,
            "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
            "message": "Something went wrong",
            "error": str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



    def update_movement(self, request):
      try:
          stock_id = request.GET.get("id")
          if not stock_id:
              return JsonResponse({
                  "success": False,
                  "status": status.HTTP_400_BAD_REQUEST,
                  "message": "Missing 'id' in query parameters."
              }, status=status.HTTP_400_BAD_REQUEST)
  
          stock_movement = StockMovement.objects.get(pk=stock_id)
  
          # Handle project FK updates
          data = request.data.copy()
  
          if "project" in data and data["project"]:
              project = get_object_or_404(Project, id=data["project"])
              data["project"] = project.id
  
          if "previous_project" in data and data["previous_project"]:
              prev_project = get_object_or_404(Project, id=data["previous_project"])
              data["previous_project"] = prev_project.id
  
          serializer = self.get_serializer(stock_movement, data=data, partial=True)
          if serializer.is_valid():
              serializer.save()
              return JsonResponse({
                  "success": True,
                  "status": status.HTTP_200_OK,
                  "message": "Stock movement updated successfully",
                  "data": serializer.data
              }, status=status.HTTP_200_OK)
          else:
              return JsonResponse({
                  "success": False,
                  "status": status.HTTP_400_BAD_REQUEST,
                  "message": "Invalid data",
                  "errors": serializer.errors
              }, status=status.HTTP_400_BAD_REQUEST)
      except StockMovement.DoesNotExist:
          return JsonResponse({
              "success": False,
              "status": status.HTTP_404_NOT_FOUND,
              "message": "Stock movement not found"
          }, status=status.HTTP_404_NOT_FOUND)
      except Exception as e:
          return JsonResponse({
              "success": False,
              "status": status.HTTP_400_BAD_REQUEST,
              "message": "Update failed",
              "errors": str(e)
          }, status=status.HTTP_400_BAD_REQUEST)

        
    def delete_movement(self, request):
        """Delete a stock movement using ?id=<id>"""
        try:
            stock_id = request.GET.get("id")
            if not stock_id:
                return JsonResponse({
                    "success": False,
                    "status": status.HTTP_400_BAD_REQUEST,
                    "message": "Missing 'id' in query parameters."
                }, status=status.HTTP_400_BAD_REQUEST)

            stock = StockMovement.objects.get(id=stock_id)
            stock.delete()

            return JsonResponse({
                "success": True,
                "status": status.HTTP_200_OK,
                "message": f"StockMovement #{stock_id} deleted successfully."
            }, status=status.HTTP_200_OK)

        except StockMovement.DoesNotExist:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_404_NOT_FOUND,
                "message": f"StockMovement with id={stock_id} not found."
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "Failed to delete stock movement.",
                "errors": str(e)
            }, status=status.HTTP_400_BAD_REQUEST)
            
            
            

    def stock_transfer(self, request):
      try:
          # Step 1: Extract previous_project_id from the URL query parameter
          previous_project_id = request.GET.get("project_id")  # Get the project_id from URL
          if not previous_project_id:
              return JsonResponse({
                  "success": False,
                  "status": status.HTTP_400_BAD_REQUEST,
                  "message": "Missing 'project_id' in URL (used as previous_project_id)"
              }, status=status.HTTP_400_BAD_REQUEST)
  
          # Step 2: Extract current_project_id from the request body
          data = request.data
          current_project_id = data.get("current_project_id")
          if not current_project_id:
              return JsonResponse({
                  "success": False,
                  "status": status.HTTP_400_BAD_REQUEST,
                  "message": "Missing required field: 'current_project_id'"
              }, status=status.HTTP_400_BAD_REQUEST)
  
          # Fetch project names from the database using project ids
          from_project = Project.objects.get(id=previous_project_id)
          to_project = Project.objects.get(id=current_project_id)
  
          # Step 3: Get the project names using the fetched projects
          previous_project_name = from_project.name
          current_project_name = to_project.name
  
          # Optional: You can log or return these names if needed
          print(f"From Project: {previous_project_name} (ID: {previous_project_id})")
          print(f"To Project: {current_project_name} (ID: {current_project_id})")
  
          # Other fields from the request payload
          inventory_id = data.get("inventory_id")
          qty_pc = Decimal(data.get("quantity_pc", 0))  # Use only this
          material_type = data.get("material_type")
          item_id = data.get("item")
          name = data.get("name", "")
          receipt_no = data.get("reciept_no")
          supplier = data.get("supplier", "")
          warehouse = data.get("warehouse", "")
          length = data.get("length")
          height = data.get("height")
          breadth = data.get("breadth")
          thickness = data.get("thickness")
  
          # Step 4: Stock check in previous project
          old_stock = StockDetails.objects.filter(
              project_id=previous_project_id,
              inventory_id=inventory_id
          ).first()
  
          if not old_stock or old_stock.quantity_available_pc < qty_pc:
              return JsonResponse({
                  "success": False,
                  "status": status.HTTP_400_BAD_REQUEST,
                  "message": "Insufficient quantity_available_pc in previous project."
              }, status=status.HTTP_400_BAD_REQUEST)
  
          # Deduct from the old project
          old_stock.quantity_available_pc -= qty_pc
          old_stock.save()
  
          # Add to the new project
          new_stock, _ = StockDetails.objects.get_or_create(
              project_id=current_project_id,
              inventory_id=inventory_id,
              defaults={"quantity_available_kg": 0, "quantity_available_pc": 0}
          )
          new_stock.quantity_available_pc += qty_pc
          new_stock.save()
  
          # Log the stock movement (OUT and IN separately)
          for project, direction in [(previous_project_id, "OUT"), (current_project_id, "IN")]:
              StockMovement.objects.create(
                  movement_type="between",
                  project_id=project,
                  previous_project_id=previous_project_id if project == current_project_id else None,
                  item_id=item_id,
                  name=name,
                  reciept_no=receipt_no,
                  supplier=supplier,
                  warehouse=warehouse,
                  length=length,
                  height=height,
                  breadth=breadth,
                  thickness=thickness,
                  material_type=material_type,
                  quantity_available_kg=0,
                  quantity_available_pc=qty_pc
              )
  
          return JsonResponse({
              "success": True,
              "status": status.HTTP_200_OK,
              "message": "Stock (by piece) transferred between projects successfully.",
              "data": {
                  "inventory_id": inventory_id,
                  "quantity_pc": str(qty_pc),
                  "from_project": {
                      "id": previous_project_id,
                      "name": previous_project_name  # Project name included in response
                  },
                  "to_project": {
                      "id": current_project_id,
                      "name": current_project_name  # Project name included in response
                  }
              }
          })
  
      except Exception as e:
          return JsonResponse({
              "success": False,
              "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
              "message": "Error during stock transfer",
              "error": str(e)
          }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
