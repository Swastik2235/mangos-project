from django.shortcuts import render
from rest_framework import viewsets
from setup.serializers.bom_sheet_serializers import CreateBOMSheetSerializer
from setup.models import BOMSheet
from rest_framework import viewsets
from rest_framework import status

from rest_framework.response import Response
from django.http import HttpResponse, JsonResponse
from datetime import datetime, timedelta
from rest_framework.parsers import MultiPartParser, FormParser




class BOMSheetViewSet(viewsets.ModelViewSet):
    parser_classes = (MultiPartParser, FormParser) 
    serializer_class =  CreateBOMSheetSerializer

    def add_bom_sheet(self, request):
        try:
            serializer = CreateBOMSheetSerializer(data=request.data)

            if serializer.is_valid():
                response = serializer.save()
                return JsonResponse({
                    "success": True,
                    "status": status.HTTP_201_CREATED,
                    "message": "BOM sheet uploaded successfully",
                    "data": {
                        'id': response.id,
                        'name': response.name,
                        'bom_file': response.bom_file.url
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
                "message": "Failed to upload BOM sheet",
                "errors": str(e)
            })



    def delete_bom_sheets(self, request):
        try:
            bom_sheet_id = request.GET.get('bom_sheet_id')
            bom_sheet = BOMSheet.objects.get(id=bom_sheet_id)
            bom_sheet.delete()
            return JsonResponse({
                    "success": True,
                    "status": status.HTTP_200_OK,
                    "message": "bom sheet deleted successfully",
                })
        except BOMSheet.DoesNotExist:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_404_NOT_FOUND,
                "message": "bom sheet not found",
            })    

        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Failed to delete bom sheet",
                "errors": str(e),
            })         
            
#def get_bom_sheet_by_project_id
