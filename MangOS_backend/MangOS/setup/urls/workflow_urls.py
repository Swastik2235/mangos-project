from django.urls import path
from setup.views.workflow import WorkflowViewSet

urlpatterns = [
    path(r'get-workflow/',WorkflowViewSet.as_view({'get':'get_all_workflows'})),
    path(r'add-workflow/',WorkflowViewSet.as_view({'post':'add_workflow'})),
    
]