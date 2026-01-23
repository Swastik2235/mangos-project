
from django.shortcuts import render
from rest_framework import viewsets
from setup.serializers.employee_serializers import CreateEmployeeSerializer
from setup.models import Employee
from rest_framework import viewsets
from rest_framework import status

from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from datetime import datetime, timedelta
# Create your views here.



#------------------------------------Organizations---------------------------------------------------------------------



class EmployeeViewSet(viewsets.ModelViewSet):

    serializer_class = CreateEmployeeSerializer
    
    def add_employee(self, request):

        try:
            obj = Employee()
            serializer = CreateEmployeeSerializer(obj, data= request.data)

            if serializer.is_valid():
                response = serializer.save()
                return JsonResponse({
                    "success": True,
                    "status": status.HTTP_201_CREATED,                
                    "message": "Employee added successfully",
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
                "message": "Failed to add Employee",
                "errors": str(e)
            })



    def get_employee_details(self ,request):
        try:
            employee = Employee.objects.all()
            serializer = CreateEmployeeSerializer(employee, many=True)
            return JsonResponse({
                        "success": True,
                        "status": status.HTTP_200_OK,                
                        "message": "Employee got successfully",
                        "data": {
                            'Employee' : serializer.data
                        }
                        }) 
        except Exception as e:
                    return JsonResponse({
                            "success": False,
                            "status": status.HTTP_400_BAD_REQUEST, 
                            "message": "Failed to get Employee",
                            "errors": str(e)
                            })
        


    def update_employee_details(self, request):
        try: 
            employee = Employee.objects.get(id=request.data['employee_id'])
            serializer = CreateEmployeeSerializer(employee, data=request.data)

            if serializer.is_valid():
                serializer.save()
                return JsonResponse({
                    "success": True,
                    "status": status.HTTP_200_OK,
                    "message": "employee updated successfully",
                    "data": {
                        "Employee": serializer.data
                    }
                })
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Employee.DoesNotExist:
             return JsonResponse({
                  "success" : False,
                  "status" : status.HTTP_404_NOT_FOUND,
                  "message" : "Employee not found",
                  "data" : {}
            })
        
    

    def delete_employee_details(self, request):
        try:
            employee_id = request.GET.get('employee_id')
            employee = Employee.objects.get(id=employee_id)
            employee.delete()
            return JsonResponse({
                    "success": True,
                    "status": status.HTTP_200_OK,
                    "message": "Employee deleted successfully",
                })
        except Employee.DoesNotExist:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_404_NOT_FOUND,
                "message": "Employee not found",
            })    

        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Failed to delete Employee",
                "errors": str(e),
            })     
            