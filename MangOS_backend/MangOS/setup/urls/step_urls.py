from django.urls import path
from setup.views.Step import StepViewSet

urlpatterns = [
    path(r'get-steps/',StepViewSet.as_view({'get':'get_all_steps'})),
    path(r'add_steps/',StepViewSet.as_view({'post':'add_step'})),
    
]