from rest_framework import viewsets, status
from django.http import JsonResponse
from mis_app.models import Departement
from mis_app.serializers.departement_serializers import DepartementSerializer

class DepartementViewSet(viewsets.ViewSet):
    serializer_class = DepartementSerializer

    def get_departements(self, request, *args, **kwargs):
        try:
            name = request.query_params.get('name')
            if name:
                departements = Departement.objects.filter(name__icontains=name)
            else:
                departements = Departement.objects.all()

            serializer = self.serializer_class(departements, many=True)
            return JsonResponse({
                "success": True,
                "status": status.HTTP_200_OK,
                "message": "Departements retrieved successfully.",
                "data": serializer.data
            })
        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Error retrieving departements.",
                "errors": str(e)
            })

    def add_departement(self, request, *args, **kwargs):
        try:
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({
                    "success": True,
                    "status": status.HTTP_201_CREATED,
                    "message": "Departement added successfully.",
                    "data": serializer.data
                })
            return JsonResponse({
                "success": False,
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "Validation failed.",
                "errors": serializer.errors
            })
        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Error adding departement.",
                "errors": str(e)
            })

    def update_departement(self, request, *args, **kwargs):
        departement_id = request.GET.get('departement_id')
        if not departement_id:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "Departement ID is required."
            })

        try:
            departement = Departement.objects.get(id=departement_id)
            serializer = self.serializer_class(departement, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({
                    "success": True,
                    "status": status.HTTP_200_OK,
                    "message": "Departement updated successfully.",
                    "data": serializer.data
                })
            return JsonResponse({
                "success": False,
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "Validation failed.",
                "errors": serializer.errors
            })
        except Departement.DoesNotExist:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_404_NOT_FOUND,
                "message": "Departement not found."
            })
        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Error updating departement.",
                "errors": str(e)
            })

    def delete_departement(self, request, *args, **kwargs):
        departement_id = request.GET.get('departement_id')
        if not departement_id:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "Departement ID is required."
            })

        try:
            departement = Departement.objects.get(id=departement_id)
            departement.delete()
            return JsonResponse({
                "success": True,
                "status": status.HTTP_204_NO_CONTENT,
                "message": "Departement deleted successfully."
            })
        except Departement.DoesNotExist:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_404_NOT_FOUND,
                "message": "Departement not found."
            })
        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Error deleting departement.",
                "errors": str(e)
            })
