
from django.shortcuts import render
from rest_framework import viewsets
from setup.serializers.maintenance_record_serializers import CreateMaintenanceRecordSerializer
from setup.models import MaintenanceRecord
from rest_framework import viewsets
from rest_framework import status

from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from datetime import datetime, timedelta
# Create your views here.



#------------------------------------Organizations---------------------------------------------------------------------



class MaintenanceRecordViewSet(viewsets.ModelViewSet):

    serializer_class = CreateMaintenanceRecordSerializer
    
    def add_maintenance_record(self, request):

        try:
            obj = MaintenanceRecord()
            serializer = CreateMaintenanceRecordSerializer(obj, data= request.data)

            if serializer.is_valid():
                response = serializer.save()
                return JsonResponse({
                    "success": True,
                    "status": status.HTTP_201_CREATED,                
                    "message": "maintenance record added successfully",
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
                "message": "failed to add maintenance record",
                "errors": str(e)
            })



    def get_maintenance_record_details(self ,request):
        try:
            maintenance = MaintenanceRecord.objects.all()
            serializer = CreateMaintenanceRecordSerializer(maintenance, many=True)
            return JsonResponse({
                        "success": True,
                        "status": status.HTTP_200_OK,                
                        "message": "maintenance record got successfully",
                        "data": {
                            'Employee' : serializer.data
                        }
                        }) 
        except Exception as e:
                    return JsonResponse({
                            "success": False,
                            "status": status.HTTP_400_BAD_REQUEST, 
                            "message": "Failed to get maintenance record",
                            "errors": str(e)
                            })
        



    def get_maintenance_record_by_machine_master_id(self ,request):
        try:
            ids = request.GET.get('machine_id')
            machine = MaintenanceRecord.objects.filter(machine_id=ids).all()
            serializer = CreateMaintenanceRecordSerializer(machine, many=True)
            return JsonResponse({
                        "success": True,
                        "status": status.HTTP_200_OK,                
                        "message": "Maintenance record got successfully",
                        "data": {
                            'maintenance_record' : serializer.data
                        }
                        }) 
        except Exception as e:
                    return JsonResponse({
                            "success": False,
                            "status": status.HTTP_400_BAD_REQUEST, 
                            "message": "Failed to get maintenance record",
                            "errors": str(e)
                            })




    def update_maintenance_record_details(self, request):
        try: 
            maintenance = MaintenanceRecord.objects.get(id=request.data['maintenance_id'])
            serializer = CreateMaintenanceRecordSerializer(maintenance, data=request.data)

            if serializer.is_valid():
                serializer.save()
                return JsonResponse({
                    "success": True,
                    "status": status.HTTP_200_OK,
                    "message": "maintenance record updated successfully",
                    "data": {
                        "Maintenance Record": serializer.data
                    }
                })
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except MaintenanceRecord.DoesNotExist:
             return JsonResponse({
                  "success" : False,
                  "status" : status.HTTP_404_NOT_FOUND,
                  "message" : "maintenance record not found",
                  "data" : {}
            })
        
    

    def delete_maintenance_record_details(self, request):
        try:
            maintenance_id = request.GET.get('maintenance_id')
            maintenance = MaintenanceRecord.objects.get(id=maintenance_id)
            maintenance.delete()
            return JsonResponse({
                    "success": True,
                    "status": status.HTTP_200_OK,
                    "message": "maintenance record deleted successfully",
                })
        except MaintenanceRecord.DoesNotExist:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_404_NOT_FOUND,
                "message": "maintenance record not found",
            })    

        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "failed to delete maintenance record",
                "errors": str(e),
            })     
            