
from django.shortcuts import render
from rest_framework import viewsets
from setup.serializers.machine_master_serializers import CreateMachineMasterSerializer
from setup.serializers.machine_material_serializers import CreateMachineMaterialSerializer
from setup.serializers.maintenance_record_serializers import CreateMaintenanceRecordSerializer
from setup.models import MachineMaster,MaintenanceRecord,MachineMaterial,MachineQRCode
from rest_framework import viewsets
from rest_framework import status

from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from datetime import datetime, timedelta
# Create your views here.



#------------------------------------Organizations---------------------------------------------------------------------



class MachineMasterViewSet(viewsets.ModelViewSet):

    serializer_class = CreateMachineMasterSerializer
    
    def add_machine_master(self, request):

        try:
            obj = MachineMaster()
            serializer = CreateMachineMasterSerializer(obj, data= request.data)

            if serializer.is_valid():
                response = serializer.save()
                MachineQRCode.objects.create(machine=response)
                return JsonResponse({
                    "success": True,
                    "status": status.HTTP_201_CREATED,                
                    "message": "Machine Master added successfully",
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
                "message": "Failed to add Machine Master",
                "errors": str(e)
            })



    def get_machine_master_details(self ,request):
        try:
            machine = MachineMaster.objects.all()
            serializer = CreateMachineMasterSerializer(machine, many=True)
            return JsonResponse({
                        "success": True,
                        "status": status.HTTP_200_OK,                
                        "message": "machine master got successfully",
                        "data": {
                            'Machine Master' : serializer.data
                        }
                        }) 
        except Exception as e:
                    return JsonResponse({
                            "success": False,
                            "status": status.HTTP_400_BAD_REQUEST, 
                            "message": "Failed to get machine master",
                            "errors": str(e)
                            })
        


    def update_machine_master_details(self, request):
      try: 
          # Safely fetch machine_id from request body or query params
          machine_id = request.data.get('machine_id') or request.GET.get('machine_id')
  
          if not machine_id:
              return JsonResponse({
                  "success": False,
                  "status": status.HTTP_400_BAD_REQUEST,
                  "message": "Missing 'machine_id' in request"
              }, status=status.HTTP_400_BAD_REQUEST)
  
          machine = MachineMaster.objects.get(id=machine_id)
          serializer = CreateMachineMasterSerializer(machine, data=request.data)
  
          if serializer.is_valid():
              serializer.save()
              return JsonResponse({
                  "success": True,
                  "status": status.HTTP_200_OK,
                  "message": "machine master updated successfully",
                  "data": {
                      "Machine Master": serializer.data
                  }
              }, status=status.HTTP_200_OK)
  
          return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
      except MachineMaster.DoesNotExist:
          return JsonResponse({
              "success": False,
              "status": status.HTTP_404_NOT_FOUND,
              "message": "machine master not found",
              "data": {}
          }, status=status.HTTP_404_NOT_FOUND)
  
      except Exception as e:
          return JsonResponse({
              "success": False,
              "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
              "message": "Unexpected error occurred",
              "error": str(e)
          }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)  
        
    

    def delete_machine_master_details(self, request):
      try:
          machine_id = request.GET.get('id')  # fetch id from query params like ?id=15
          if not machine_id:
              return JsonResponse({
                  "success": False,
                  "status": status.HTTP_400_BAD_REQUEST,
                  "message": "Missing 'id' in query parameters."
              }, status=status.HTTP_400_BAD_REQUEST)
  
          machine = MachineMaster.objects.get(id=machine_id)
          machine.delete()
  
          return JsonResponse({
              "success": True,
              "status": status.HTTP_200_OK,
              "message": "Machine master deleted successfully.",
          }, status=status.HTTP_200_OK)
  
      except MachineMaster.DoesNotExist:
          return JsonResponse({
              "success": False,
              "status": status.HTTP_404_NOT_FOUND,
              "message": "Machine master not found",
          }, status=status.HTTP_404_NOT_FOUND)
  
      except Exception as e:
          return JsonResponse({
              "success": False,
              "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
              "message": "Failed to delete machine master.",
              "errors": str(e),
          }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
       
      
      
      
    def get_all_machine_data(self,request):
        try:
            machines = MachineMaster.objects.all()
            maintenance_records = MaintenanceRecord.objects.all()
            materials = MachineMaterial.objects.all()
    
            machine_serializer = CreateMachineMasterSerializer(machines, many=True)
            maintenance_serializer = CreateMaintenanceRecordSerializer(maintenance_records, many=True)
            material_serializer = CreateMachineMaterialSerializer(materials, many=True)
    
            return JsonResponse({
                "success": True,
                "status": status.HTTP_200_OK,                
                "message": "All machine-related records retrieved successfully",
                "data": {
                    "Machines": machine_serializer.data,
                    "MaintenanceRecords": maintenance_serializer.data,
                    "Materials": material_serializer.data
                }
            })
        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_400_BAD_REQUEST, 
                "message": "Failed to retrieve machine data",
                "errors": str(e)
            })      
      
            