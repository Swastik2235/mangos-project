from mis_app.views.galva_production import GalvaProductionViewSet
from django.urls import path, include

urlpatterns = [
    path('get-galva-production/', GalvaProductionViewSet.as_view({'get': 'get_galva_production'})),
    path('add-galva-production/', GalvaProductionViewSet.as_view({'post': 'add_galva_production'})),
    path('update-galva-production/', GalvaProductionViewSet.as_view({'get': 'update_galva_production'})),
    path('delete-galva-production/', GalvaProductionViewSet.as_view({'delete': 'delete_galva_production'})),
    path('get-galva-production-by-date/', GalvaProductionViewSet.as_view({'get': 'get_galva_production_by_date'})),
    path('get-galva-production-by-id/', GalvaProductionViewSet.as_view({'get': 'get_galva_production_by_id'})),
]