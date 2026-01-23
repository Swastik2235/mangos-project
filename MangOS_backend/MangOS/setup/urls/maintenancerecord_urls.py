 
 
from django.urls import path
from setup.views.maintenance_record import MaintenanceRecordViewSet

urlpatterns = [

    path(r'create-maintenance-record/',MaintenanceRecordViewSet.as_view({'post':'add_maintenance_record'})),
    path(r'get-maintenance-record/',MaintenanceRecordViewSet.as_view({'get':'get_maintenance_record_details'})),
    path(r'update-maintenance-record-by-maintenance-id/',MaintenanceRecordViewSet.as_view({'put':'update_maintenance_record_details'})),
    path(r'delete-maintenance-record-by-maintenance-id/',MaintenanceRecordViewSet.as_view({'delete':'delete_maintenance_record_details'})),
    
    path(r'get-maintenance-record-by-machine-master-id/',MaintenanceRecordViewSet.as_view({'get':'get_maintenance_record_by_machine_master_id'})),

    


    

]   