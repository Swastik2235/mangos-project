from mis_app.views.fab_production import FabricationProductionViewSet
from django.urls import path, include

urlpatterns = [
    path('get-fabrication-production/', FabricationProductionViewSet.as_view({'get': 'get_fabrication_production'})),
    path('add-fabrication-production/', FabricationProductionViewSet.as_view({'post': 'add_fabrication_production'})),
    path('update-fabrication-production/', FabricationProductionViewSet.as_view({'put': 'update_fabrication_production'})),
    path('delete-fabrication-production/', FabricationProductionViewSet.as_view({'delete': 'delete_fabrication_production'})),
    path('get-fabrication-production-by-date/', FabricationProductionViewSet.as_view({'get': 'get_fabrication_production_by_date'})),
]