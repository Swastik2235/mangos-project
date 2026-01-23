from mis_app.views.fab_plus_galva import FabPlusGalvaProductionViewSet
from django.urls import path, include

urlpatterns = [
    path('get-fab-plus-galva-production/', FabPlusGalvaProductionViewSet.as_view({'get': 'get_fab_plus_galva_production'})),
    path('add-fab-plus-galva-production/', FabPlusGalvaProductionViewSet.as_view({'post': 'add_fab_plus_galva_production'})),
    path('update-fab-plus-galva-production/', FabPlusGalvaProductionViewSet.as_view({'put': 'update_fab_plus_galva_production'})),
    path('delete-fab-plus-galva-production/', FabPlusGalvaProductionViewSet.as_view({'delete': 'delete_fab_plus_galva_production'}) ),
    path('get-fab-plus-galva-by-date/', FabPlusGalvaProductionViewSet.as_view({'get': 'get_fab_plus_galva_by_date'})),
]