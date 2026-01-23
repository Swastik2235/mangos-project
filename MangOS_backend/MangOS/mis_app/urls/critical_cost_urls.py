from mis_app.views.critical_cost import CriticalCostViewSet
from django.urls import path, include

urlpatterns = [
    path('get-critical_cost/', CriticalCostViewSet.as_view({'get': 'get_critical_cost'})),
    path('add-critical_cost/', CriticalCostViewSet.as_view({'post': 'add_critical_cost'})),
    path('update-critical-cost/', CriticalCostViewSet.as_view({'put': 'update_critical_cost'})),
    path('delete-critical-cost/', CriticalCostViewSet.as_view({'delete': 'delete_critical_cost'})),
    path('critical-cost-by-type/', CriticalCostViewSet.as_view({'get': 'get_critical_cost_by_type'}) ),
]