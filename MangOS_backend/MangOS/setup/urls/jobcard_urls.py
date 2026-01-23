from django.urls import path
from setup.views.job_card import CreateJobCardViewSet,JobCardViewSet,GetJobCardViewSet
from setup.views.job_api import JobCardAPI,GetDataCard
urlpatterns = [
    

    path(r'job-card-creation/',CreateJobCardViewSet.as_view({'get':'job_card_creation'})),
    path(r'process-bom-sheet/',JobCardViewSet.as_view({'get':'process_bom_sheet'})),
    
    path(r'get-job-card-data/',JobCardViewSet.as_view({'get':'post'})),
    
    
    #path(r'process-bom-sheet/',JobCardAPI.as_view({'get':'process_bom_sheet'})),
    path(r'get-job-sheet/',JobCardAPI.as_view({'get':'get_job_card'})),
    path(r'get-allocation-data/',JobCardAPI.as_view({'get':'get_allocation_data'})),
    path(r'get-header/',JobCardAPI.as_view({'get':'get_header'})),
    
    
    
    
    
    
    
    
    
    path(r'process-bom-sheet-data/',GetDataCard.as_view({'get':'process_bom_sheet_data'})),
    
    path(r'get-job-card-by-id/',GetJobCardViewSet.as_view({'get':'retrieve_job_by_id'})),
    path(r'get-list-of-job-card/',GetJobCardViewSet.as_view({'get':'get_list_of_job_card'})),



    


]

