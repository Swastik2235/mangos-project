from mis_app.views.client import ClientViewSet
from django.urls import path


urlpatterns = [
    path('get-client/', ClientViewSet.as_view({'get':'get_clients'})),
    path('add-client/', ClientViewSet.as_view({'post':'add_client'})),
    path('update-client/', ClientViewSet.as_view({'put':'update_client'})),
    path('delete-client/', ClientViewSet.as_view({'delete':'delete_client'})),

]