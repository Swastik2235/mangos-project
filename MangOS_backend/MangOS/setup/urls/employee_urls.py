from django.urls import path
from setup.views.employee import EmployeeViewSet

urlpatterns = [

    path(r'create-employee/',EmployeeViewSet.as_view({'post':'add_employee'})),
    path(r'get-employee-details/',EmployeeViewSet.as_view({'get':'get_employee_details'})),
    path(r'update-employee-details/',EmployeeViewSet.as_view({'put':'update_employee_details'})),
    path(r'delete-employee-details/',EmployeeViewSet.as_view({'delete':'delete_employee_details'})),

    


    

]