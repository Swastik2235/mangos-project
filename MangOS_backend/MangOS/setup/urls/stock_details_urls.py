from django.urls import path
from setup.views.stock_details import StockDetailsViewset

urlpatterns = [
    path(r'add-stock-details/',StockDetailsViewset.as_view({'post':'add_stock'})),
    path(r'update-stock-details/',StockDetailsViewset.as_view({'put':'update_stock'})),
    path(r'get-stock-details/',StockDetailsViewset.as_view({'get':'get_details'})),
    path(r'get-stock-detail-by-id/',StockDetailsViewset.as_view({'get':'get_by_id'})),
    path(r'delete-stock-details/',StockDetailsViewset.as_view({'delete':'delete_stock'})),
    
    path(r'get-stock-details-by-inventory-id/',StockDetailsViewset.as_view({'get':'get_stock_details_by_inventory_id'})),
    
    
    
]