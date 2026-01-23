from django.urls import path
from setup.views.client_details import ClientDetailsViewSet

urlpatterns = [
    

    path(r'create-client-details/',ClientDetailsViewSet.as_view({'post':'add_client_details'})),
    path(r'get-client-details/',ClientDetailsViewSet.as_view({'get':'get_client_details'})),
    path(r'update-client-details/',ClientDetailsViewSet.as_view({'put':'update_client_details'})),
    path(r'delete-client-details/',ClientDetailsViewSet.as_view({'delete':'delete_client_details'})),

    


    

]