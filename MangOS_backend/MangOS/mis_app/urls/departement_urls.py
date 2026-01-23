from mis_app.views.cost import CostViewSet
from django.urls import path, include

urlpatterns = [
    path('get-departements/', CostViewSet.as_view({'get': 'get_departements'})),
    path('add-departement/', CostViewSet.as_view({'post': 'add_departement'})),
    path('update-departement/', CostViewSet.as_view({'put': 'update_departement'})),
    path('delete-departement/', CostViewSet.as_view({'delete': 'delete_departement'})),
]