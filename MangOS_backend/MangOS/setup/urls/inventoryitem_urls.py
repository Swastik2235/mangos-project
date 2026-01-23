from django.urls import path
from setup.views.inventory_items import InventoryItemViewSet

urlpatterns = [
    

    path(r'create-inventory-item/',InventoryItemViewSet.as_view({'post':'add_inventory_item'})),
    path(r'get-inventory-item-details/',InventoryItemViewSet.as_view({'get':'get_inventory_item_details'})),
    path(r'update-inventory-item-details/',InventoryItemViewSet.as_view({'put':'update_inventory_item_details'})),
    path(r'delete-inventory-item-details/',InventoryItemViewSet.as_view({'delete':'delete_inventory_item_details'})),
    
    path(r'get-inventory-item-by-inventory-category-id/',InventoryItemViewSet.as_view({'get':'get_inventory_item_by_inventory_category_id'})),
    
    path(r'get-inventory-item-name/',InventoryItemViewSet.as_view({'get':'get_inventory_item_name'})),
    path(r'get-inventory-item-by-item-master-id/',InventoryItemViewSet.as_view({'get':'get_inventory_item_by_item_master_id'})),

    


    

]