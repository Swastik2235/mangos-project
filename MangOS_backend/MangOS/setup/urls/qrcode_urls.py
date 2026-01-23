from django.urls import path
from setup.views.qr_code import QRCodeViewset,CreateJobCardViewSet

urlpatterns = [
    

    path(r'get-machine-qr-code/',QRCodeViewset.as_view({'get':'get_machine_qr_code'})),
    path(r'get-job-card-by-qr/',CreateJobCardViewSet.as_view({'get':'get_job_card_by_qr'})),

    # path(r'job-card-creation/',CreateJobCardViewSet.as_view({'get':'job_card_creation'})),
    



    


    

]