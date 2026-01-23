from mis_app.views.daily_cost import DailyCostViewSet
from django.urls import path, include

urlpatterns = [
    path('get-daily-cost/', DailyCostViewSet.as_view({'get': 'get_daily_cost'})),
    path('add-daily-cost/', DailyCostViewSet.as_view({'post': 'add_daily_cost'})),
    path('update-daily-cost/', DailyCostViewSet.as_view({'put': 'update_daily_cost'})),
    path('delete-daily-cost/', DailyCostViewSet.as_view({'delete': 'delete_daily_cost'})),
    path('get-total-daily-cost/', DailyCostViewSet.as_view({'get': 'get_daily_total_cost'})),
    path('get-daily-units-consumed/', DailyCostViewSet.as_view({'get': 'get_daily_units_consumed'})),
]