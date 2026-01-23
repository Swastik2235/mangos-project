from django.urls import path
from setup.views.project_details import ProjectViewset

urlpatterns = [

    path(r'create-project/',ProjectViewset.as_view({'post':'create_project'})),
    path(r'get-project-names/',ProjectViewset.as_view({'get':'get_project_name'})),
    path(r'get-project-details/',ProjectViewset.as_view({'get':'get_project_details'})),
    path(r'update-project-details/',ProjectViewset.as_view({'put':'update_project_details'}))

]  