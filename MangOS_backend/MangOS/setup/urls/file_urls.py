

from django.urls import path
from setup.views.files import FilesByProjectView

urlpatterns = [
    path('get-files/', FilesByProjectView.as_view({'get': 'list'})),
    path('update-files/', FilesByProjectView.as_view({'put': 'update_by_file_id'})),
    path('delete-files/', FilesByProjectView.as_view({'delete': 'delete_by_file_id'})),
    path('add-files/', FilesByProjectView.as_view({'post': 'create_by_project_id'})),
    path('get-files-by-id/', FilesByProjectView.as_view({'get': 'get_by_file_id'})),
    
    
    
]