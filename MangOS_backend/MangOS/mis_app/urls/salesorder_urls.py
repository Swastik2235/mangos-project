from mis_app.views.salesorder import SalesOrderViewSet
from django.urls import path, include

urlpatterns = [
    path('get-saleorder/', SalesOrderViewSet.as_view({'get': 'get_salesorder'})),
    path('add-saleorder/', SalesOrderViewSet.as_view({'post': 'add_salesorder'})),
    path('update-saleorder/', SalesOrderViewSet.as_view({'post': 'update_salesorder'})),    
    path('delete-saleorder/', SalesOrderViewSet.as_view({'post': 'delete_salesorder'})),
    path('get-salesorder-by-id/', SalesOrderViewSet.as_view({'get': 'get_salesorder_by_id'})),
    
]