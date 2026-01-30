from django.urls import path
from mis_app.views.zoho_oauth import exchange_token, refresh_token

urlpatterns = [
    path('zoho/exchange-token/', exchange_token, name='zoho_exchange_token'),
    path('zoho/refresh-token/', refresh_token, name='zoho_refresh_token'),
]