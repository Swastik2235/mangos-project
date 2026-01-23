from mis_app.views.prod_summary import ProductionSummaryViewSet
from django.urls import path, include

urlpatterns = [
    path('get-prod_summary/', ProductionSummaryViewSet.as_view({'get': 'get_prod_summary'})),
    path('get-fab-prod-summary/', ProductionSummaryViewSet.as_view({'get': 'get_fab_prod_data'})),
    path('get-galva-prod-summary/', ProductionSummaryViewSet.as_view({'get': 'get_galva_prod_data'})),
    path('get-solar-prod-summary/', ProductionSummaryViewSet.as_view({'get': 'get_solar_prod_data'})),
    path('get-scrap-metrics/', ProductionSummaryViewSet.as_view({'get': 'get_scrap_data'})),
    path('add-prod_summary/', ProductionSummaryViewSet.as_view({'post': 'add_prod_summary'})),
    path('update-prod_summary/', ProductionSummaryViewSet.as_view({'put': 'update_prod_summary'})),
    path('delete-prod_summary/', ProductionSummaryViewSet.as_view({'delete': 'delete_prod_summary'})),

]
