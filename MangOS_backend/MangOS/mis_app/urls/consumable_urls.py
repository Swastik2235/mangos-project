from mis_app.views.consumable_cost import ConsumablesAndWasteCostsViewSet
from django.urls import path, include

urlpatterns = [
    path('get-consumables-and-waste-costs/', ConsumablesAndWasteCostsViewSet.as_view({'get': 'get_consumables_and_waste_costs'})),
    path('add-consumables-and-waste-costs/', ConsumablesAndWasteCostsViewSet.as_view({'post': 'add_consumables_and_waste_costs'})),
    path('update-consumables-and-waste-costs/', ConsumablesAndWasteCostsViewSet.as_view({'put': 'update_consumables_and_waste_costs'})),
    path('delete-consumables-and-waste-costs/', ConsumablesAndWasteCostsViewSet.as_view({'delete': 'delete_consumables_and_waste_costs'})),
    path('get-total-costs/', ConsumablesAndWasteCostsViewSet.as_view({'get': 'get_total_costs'})),
    path('get-costs-by-date/', ConsumablesAndWasteCostsViewSet.as_view({'get': 'get_costs_by_date'})),
    path('get-costs-by-type/', ConsumablesAndWasteCostsViewSet.as_view({'get': 'get_cost_by_type'})),
]
