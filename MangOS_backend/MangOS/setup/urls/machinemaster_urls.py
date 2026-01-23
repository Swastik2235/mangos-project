 
 
from django.urls import path
from setup.views.machine_master import MachineMasterViewSet

urlpatterns = [

    path(r'create-machine-master/',MachineMasterViewSet.as_view({'post':'add_machine_master'})),
    path(r'get-machine-master/',MachineMasterViewSet.as_view({'get':'get_machine_master_details'})),
    path(r'update-machine-master-by-machine-id/',MachineMasterViewSet.as_view({'put':'update_machine_master_details'})),
    path(r'delete-machine-master-by-machine-id/',MachineMasterViewSet.as_view({'delete':'delete_machine_master_details'})),


    path(r'get-machine-master-data/',MachineMasterViewSet.as_view({'get':'get_all_machine_data'})),
    


    

] 