from django.urls import path
from mis_app.views.cost import CostViewSet

urlpatterns = [
    path('get-costs/', CostViewSet.as_view({'get': 'list_costs'})),
    path('add-cost/', CostViewSet.as_view({'post': 'create_cost'})),
    path('update-cost/', CostViewSet.as_view({'put': 'update_cost'})),
    path('delete-cost/', CostViewSet.as_view({'delete': 'delete_cost'})),
    path('get-cost-by-id/', CostViewSet.as_view({'get': 'retrieve_cost_by_id'})),
    path('get-cost-by-project/', CostViewSet.as_view({'get': 'retrieve_cost_by_project'})),
    path('get-cost-total-value/', CostViewSet.as_view({'get': 'get_total_cost_value'})),
    path('get-cost-by-date/', CostViewSet.as_view({'get': 'retrieve_cost_by_date'})),
]
