
from django.shortcuts import render
from rest_framework import viewsets
from setup.serializers.client_details_serializers import CreateClientDetailsSerializer
from setup.models import ClientDetails
from rest_framework import viewsets
from rest_framework import status

from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from datetime import datetime, timedelta
# Create your views here.



#------------------------------------Organizations---------------------------------------------------------------------



class ClientDetailsViewSet(viewsets.ModelViewSet):

    serializer_class = CreateClientDetailsSerializer
    
    def add_client_details(self, request):

        try:
            obj = ClientDetails()
            serializer = CreateClientDetailsSerializer(obj, data= request.data)

            if serializer.is_valid():
                response = serializer.save()
                return JsonResponse({
                    "success": True,
                    "status": status.HTTP_201_CREATED,                
                    "message": "Client Details added successfully",
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
                "message": "Failed to add Client Details",
                "errors": str(e)
            })



    def get_client_details(self ,request):
        try:
            employee = ClientDetails.objects.all()
            serializer = CreateClientDetailsSerializer(employee, many=True)
            return JsonResponse({
                        "success": True,
                        "status": status.HTTP_200_OK,                
                        "message": "Client Details got successfully",
                        "data": {
                            'Employee' : serializer.data
                        }
                        }) 
        except Exception as e:
                    return JsonResponse({
                            "success": False,
                            "status": status.HTTP_400_BAD_REQUEST, 
                            "message": "Failed to get Client Details",
                            "errors": str(e)
                            })
        


    def update_client_details(self, request):
        try: 
            client = ClientDetails.objects.get(id=request.data['client_id'])
            serializer = CreateClientDetailsSerializer(client, data=request.data)

            if serializer.is_valid():
                serializer.save()
                return JsonResponse({
                    "success": True,
                    "status": status.HTTP_200_OK,
                    "message": "client details updated successfully",
                    "data": {
                        "Client Details": serializer.data
                    }
                })
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except ClientDetails.DoesNotExist:
             return JsonResponse({
                  "success" : False,
                  "status" : status.HTTP_404_NOT_FOUND,
                  "message" : "Client Details not found",
                  "data" : {}
            })
        
    

    def delete_client_details(self, request):
        try:
            client_id = request.GET.get('client_id')
            client_details = ClientDetails.objects.get(id=client_id)
            client_details.delete()
            return JsonResponse({
                    "success": True,
                    "status": status.HTTP_200_OK,
                    "message": "Client Details deleted successfully",
                })
        except ClientDetails.DoesNotExist:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_404_NOT_FOUND,
                "message": "Client Details not found",
            })    

        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Failed to delete Client Details",
                "errors": str(e),
            })     
            