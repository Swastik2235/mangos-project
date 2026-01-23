  
from django.urls import path
from setup.views.user import RegisterView,LoginView,ForgotPasswordView,SetNewPasswordView

urlpatterns = [
    path(r'register-user/',RegisterView.as_view({'post':'register_user'})),
    path(r'login-user/',LoginView.as_view({'post':'login_user'})),
    path(r'forgot-password/',ForgotPasswordView.as_view({'post':'forgot_password'})),
    path(r'set-new-password/',SetNewPasswordView.as_view({'post':'set_new_password'})),
    
    
    
]  