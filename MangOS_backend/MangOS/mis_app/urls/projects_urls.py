from mis_app.views.project import ProjectViewSet
from django.urls import path, include

urlpatterns = [
    path('get-projects/', ProjectViewSet.as_view({'get': 'get_projects'})),
    path('add-project/', ProjectViewSet.as_view({'post': 'add_project'})),
    path('update-project/', ProjectViewSet.as_view({'put': 'update_project'})),
    path('delete-project/', ProjectViewSet.as_view({'delete': 'delete_project'})),
    path('get-project-by-client-id/', ProjectViewSet.as_view({'get': 'get_projects_by_client'})),
]