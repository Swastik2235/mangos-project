from mis_app.views.solar_production import SolarProductionViewSet
from django.urls import path, include

urlpatterns = [
    path('get-solar/', SolarProductionViewSet.as_view({'get': 'get_solar_production'})),
    path('add-solar/', SolarProductionViewSet.as_view({'post': 'add_solar_production'})),
    path('update-solar/', SolarProductionViewSet.as_view({'put': 'update_solar_production'})),
    path('delete-solar/', SolarProductionViewSet.as_view({'delete': 'delete_solar_production'})),
    path('get-solar-by-id/', SolarProductionViewSet.as_view({'get': 'get_solar_production_by_id'}) ),
]

