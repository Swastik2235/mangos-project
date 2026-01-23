from django.urls import path
from setup.views.stock_movement import StockMovementViewSet

urlpatterns = [
    path(r'get-stock-movement/',StockMovementViewSet.as_view({'get':'get_movement'})),
    path(r'add-stock-movement/',StockMovementViewSet.as_view({'post':'add_movement'})),
    path(r'update-stock-movement/',StockMovementViewSet.as_view({'put':'update_movement'})),
    path(r'delete-stock-movement/',StockMovementViewSet.as_view({'delete':'delete_movement'})),
    path(r'transfer-stock-movement/',StockMovementViewSet.as_view({'post':'stock_transfer'})),
]