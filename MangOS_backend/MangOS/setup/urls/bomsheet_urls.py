from django.urls import path
from setup.views.bom_sheets import BOMSheetViewSet

urlpatterns = [
    

    path(r'add-bom-sheet/',BOMSheetViewSet.as_view({'post':'add_bom_sheet'})),
    # path(r'get-client-details/',ClientDetailsViewSet.as_view({'get':'get_client_details'})),
    # path(r'update-client-details/',ClientDetailsViewSet.as_view({'put':'update_client_details'})),
    path(r'delete-bom-sheet/',BOMSheetViewSet.as_view({'delete':'delete_bom_sheets'})),

    


    

]