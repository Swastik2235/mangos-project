from mis_app.views.user import UserViewSet
from django.urls import path

urlpatterns = [
    path('get-user/', UserViewSet.as_view({'get': 'get_users'})),
    path('add-user/', UserViewSet.as_view({'post': 'add_user'})),
    path('update-user/', UserViewSet.as_view({'put': 'update_user'})),
    path('delete-user/', UserViewSet.as_view({'delete': 'delete_user'})),
    path('get-user-by-id/', UserViewSet.as_view({'get': 'get_user_by_id'})),
]