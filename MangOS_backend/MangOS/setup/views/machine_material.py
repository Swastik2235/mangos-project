
from django.shortcuts import render
from rest_framework import viewsets
from setup.serializers.machine_material_serializers import CreateMachineMaterialSerializer
from setup.models import MachineMaterial
from rest_framework import viewsets
from rest_framework import status

from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from datetime import datetime, timedelta
# Create your views here.



#------------------------------------Organizations---------------------------------------------------------------------



class MachineMaterialViewSet(viewsets.ModelViewSet):

    serializer_class = CreateMachineMaterialSerializer
    
    def add_machine_material(self, request):

        try:
            obj = MachineMaterial()
            serializer = CreateMachineMaterialSerializer(obj, data= request.data)

            if serializer.is_valid():
                response = serializer.save()
                return JsonResponse({
                    "success": True,
                    "status": status.HTTP_201_CREATED,                
                    "message": "Machine material added successfully",
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
                "message": "Failed to add machine material",
                "errors": str(e)
            })



    def get_machine_material_details(self ,request):
        try:
            material = MachineMaterial.objects.all()
            serializer = CreateMachineMaterialSerializer(material, many=True)
            return JsonResponse({
                        "success": True,
                        "status": status.HTTP_200_OK,                
                        "message": "Machine material got successfully",
                        "data": {
                            'Machine Material' : serializer.data
                        }
                        }) 
        except Exception as e:
                    return JsonResponse({
                            "success": False,
                            "status": status.HTTP_400_BAD_REQUEST, 
                            "message": "Failed to get machine material",
                            "errors": str(e)
                            })
       
       
       
       
    def get_machine_material_by_machine_master_id(self ,request):
        try:
            ids = request.GET.get('machine_id')
            material = MachineMaterial.objects.filter(machine_id=ids).all()
            serializer = CreateMachineMaterialSerializer(material, many=True)
            return JsonResponse({
                        "success": True,
                        "status": status.HTTP_200_OK,                
                        "message": "Machine material got successfully",
                        "data": {
                            'machine_material' : serializer.data
                        }
                        }) 
        except Exception as e:
                    return JsonResponse({
                            "success": False,
                            "status": status.HTTP_400_BAD_REQUEST, 
                            "message": "Failed to get machine material",
                            "errors": str(e)
                            })       
        


    def update_machine_material_details(self, request):
        try: 
            material_id = MachineMaterial.objects.get(id=request.data['material_id'])
            serializer = CreateMachineMaterialSerializer(material_id, data=request.data)

            if serializer.is_valid():
                serializer.save()
                return JsonResponse({
                    "success": True,
                    "status": status.HTTP_200_OK,
                    "message": "machine materail updated successfully",
                    "data": {
                        "Machine Material": serializer.data
                    }
                })
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except MachineMaterial.DoesNotExist:
             return JsonResponse({
                  "success" : False,
                  "status" : status.HTTP_404_NOT_FOUND,
                  "message" : "machine materail not found",
                  "data" : {}
            })
        
    

    def delete_machine_material_details(self, request):
        try:
            material_id = request.GET.get('material_id')
            material = MachineMaterial.objects.get(id=material_id)
            material.delete()
            return JsonResponse({
                    "success": True,
                    "status": status.HTTP_200_OK,
                    "message": "machine material deleted successfully",
                })
        except MachineMaterial.DoesNotExist:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_404_NOT_FOUND,
                "message": "machine material not found",
            })    

        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Failed to delete machine material",
                "errors": str(e),
            })     
            