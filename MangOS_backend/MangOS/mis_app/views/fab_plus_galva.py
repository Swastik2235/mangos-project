from rest_framework import viewsets
from django.http import JsonResponse
from mis_app.models import FabPlusGalvaProduction
from mis_app.serializers.fab_plus_galva_prod_serializers import FabPlusGalvaProductionSerializer

class FabPlusGalvaProductionViewSet(viewsets.ModelViewSet):
    """
    ViewSet for handling Fab Plus Galva Production data.
    """
    serializer_class = FabPlusGalvaProductionSerializer

    def get_fab_plus_galva_production(self, request, *args, **kwargs):
        """
        Get Fab Plus Galva production data.
        """
        try:
            fab_plus_galva_production = FabPlusGalvaProduction.objects.all()
            serializer = self.get_serializer(fab_plus_galva_production, many=True)
            return JsonResponse({
                "status": "success",
                "message": "Fab Plus Galva production data retrieved successfully.",
                "data": serializer.data
            }, safe=False, status=200)
        except Exception as e:
            return JsonResponse({
                "status": "error",
                "message": f"An error occurred while retrieving data: {str(e)}"
            }, status=500)

    def add_fab_plus_galva_production(self, request, *args, **kwargs):
        """
        Add Fab Plus Galva production data.
        """
        try:
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({
                    "status": "success",
                    "message": "Fab Plus Galva production data added successfully.",
                    "data": serializer.data
                }, status=201)
            return JsonResponse({
                "status": "error",
                "message": "Invalid data",
                "errors": serializer.errors
            }, status=400)
        except Exception as e:
            return JsonResponse({
                "status": "error",
                "message": f"An error occurred while adding data: {str(e)}"
            }, status=500)

    def update_fab_plus_galva_production(self, request, *args, **kwargs):
        """
        Update Fab Plus Galva production data.
        """
        try:
            production_id = request.data.GET.get('production_id')  # Use GET for the ID
            if not production_id:
                return JsonResponse({
                    "status": "error",
                    "message": "Production ID is required."
                }, status=400)

            try:
                fab_plus_galva_production = FabPlusGalvaProduction.objects.get(pk=production_id)
            except FabPlusGalvaProduction.DoesNotExist:
                return JsonResponse({
                    "status": "error",
                    "message": "Fab Plus Galva production data not found."
                }, status=404)

            serializer = self.get_serializer(fab_plus_galva_production, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({
                    "status": "success",
                    "message": "Fab Plus Galva production data updated successfully.",
                    "data": serializer.data
                }, status=200)
            return JsonResponse({
                "status": "error",
                "message": "Invalid data",
                "errors": serializer.errors
            }, status=400)
        except Exception as e:
            return JsonResponse({
                "status": "error",
                "message": f"An error occurred while updating data: {str(e)}"
            }, status=500)

    def delete_fab_plus_galva_production(self, request, *args, **kwargs):
        """
        Delete Fab Plus Galva production data.
        """
        try:
            production_id = request.data.GET.get('production_id')  # Use GET for the ID
            if not production_id:
                return JsonResponse({
                    "status": "error",
                    "message": "Production ID is required."
                }, status=400)

            try:
                fab_plus_galva_production = FabPlusGalvaProduction.objects.get(pk=production_id)
            except FabPlusGalvaProduction.DoesNotExist:
                return JsonResponse({
                    "status": "error",
                    "message": "Fab Plus Galva production data not found."
                }, status=404)

            fab_plus_galva_production.delete()
            return JsonResponse({
                "status": "success",
                "message": "Fab Plus Galva production data deleted successfully."
            }, status=204)
        except Exception as e:
            return JsonResponse({
                "status": "error",
                "message": f"An error occurred while deleting data: {str(e)}"
            }, status=500)

    def get_fab_plus_galva_by_date(self, request, *args, **kwargs):
        """
        Get Fab Plus Galva production data by date.
        """
        try:
            date = request.GET.get('production_date')
            if not date:
                return JsonResponse({
                    "status": "error",
                    "message": "Production date parameter is required."
                }, status=400)
            
            fab_plus_galva_production = FabPlusGalvaProduction.objects.filter(date=date)
            if not fab_plus_galva_production:
                return JsonResponse({
                    "status": "error",
                    "message": "No data found for the given date."
                }, status=404)

            serializer = self.get_serializer(fab_plus_galva_production, many=True)
            return JsonResponse({
                "status": "success",
                "message": "Fab Plus Galva production data retrieved by date successfully.",
                "data": serializer.data
            }, safe=False, status=200)
        except Exception as e:
            return JsonResponse({
                "status": "error",
                "message": f"An error occurred while retrieving data: {str(e)}"
            }, status=500)
