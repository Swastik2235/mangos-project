from django.urls import path
from setup.views.inventory_category import InventoryCategoryViewSet,InventoryListView

urlpatterns = [
    

    path(r'create-inventory-category/',InventoryCategoryViewSet.as_view({'post':'add_inventory_category'})),
    path(r'get-inventory-category-details/',InventoryCategoryViewSet.as_view({'get':'get_Inventory_category_details'})),
    path(r'update-inventory-category-details/',InventoryCategoryViewSet.as_view({'put':'update_inventory_category_details'})),
    path(r'delete-inventory-category-details/',InventoryCategoryViewSet.as_view({'delete':'delete_inventory_category_details'})),

    
    path(r'get-all-inventory/',InventoryListView.as_view({'get':'get_all_inventory'})),

    

]