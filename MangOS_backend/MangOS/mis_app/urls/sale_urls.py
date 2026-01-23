from mis_app.views.sale import SaleViewSet 
from django.urls import path, include

urlpatterns = [
    path('get-sale/', SaleViewSet.as_view({'get': 'get_sales'})),
    path('add-sale/', SaleViewSet.as_view({'post': 'add_sale'})),
    path('update-sale/', SaleViewSet.as_view({'post': 'update_sale'})),
    path('delete-sale/', SaleViewSet.as_view({'post': 'delete_sale'})),
    path('get-sales-tonnage/', SaleViewSet.as_view({'get': 'get_sales_tonnage'})),
    path('get-earnings/', SaleViewSet.as_view({'get': 'get_earnings'})),
    path('get-sales-cost-ratio/', SaleViewSet.as_view({'get': 'sales_cost_ratios'})),
    path('get-sales-earnings-ratio/', SaleViewSet.as_view({'get': 'sales_earnings_ratios'})),
    path('get-sales-tonnage-ratio/',SaleViewSet.as_view({'get':'sales_tonnage_ratio'})),
    path('get-cost-earnings-ratio/',SaleViewSet.as_view({'get':'cost_earnings_ratio'})),
    path('get-revenue/',SaleViewSet.as_view({'get':'revenue'})),
]