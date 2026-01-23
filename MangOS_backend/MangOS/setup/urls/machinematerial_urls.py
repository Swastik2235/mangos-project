 
 
 
 
from django.urls import path
from setup.views.machine_material import MachineMaterialViewSet

urlpatterns = [

    path(r'create-machine-material/',MachineMaterialViewSet.as_view({'post':'add_machine_material'})),
    path(r'get-machine-material/',MachineMaterialViewSet.as_view({'get':'get_machine_material_details'})),
    path(r'update-machine-material-by-machine-id/',MachineMaterialViewSet.as_view({'put':'update_machine_material_details'})),
    path(r'delete-machine-material-by-machine-id/',MachineMaterialViewSet.as_view({'delete':'delete_machine_material_details'})),
    path(r'get-machine-material-by-machine-master-id/',MachineMaterialViewSet.as_view({'get':'get_machine_material_by_machine_master_id'})),

    


    

]  