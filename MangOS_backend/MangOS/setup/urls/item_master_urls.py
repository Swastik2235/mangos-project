from setup.views.item_master import ItemMasterViewset
from django.urls import path

urlpatterns = [
    path(r'get-item-master/',ItemMasterViewset.as_view({'get':'get_item_master'})),
    path(r'get-item-name/',ItemMasterViewset.as_view({'get':'get_item_name'})),
    path(r'add-item-master/',ItemMasterViewset.as_view({'post':'add_item_master'})),
    path(r'update-item-master/',ItemMasterViewset.as_view({'put':'update_item_master'})),
    path(r'delete-item-master/',ItemMasterViewset.as_view({'post':'delete_item_master'})),
]