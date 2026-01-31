# Zoho CRM URL Configuration
from django.urls import path
from setup.views.zoho_crm_views import (
    zoho_token_exchange,
    zoho_contacts,
    zoho_leads,
    zoho_deals,
    zoho_create_contact
)

urlpatterns = [
    # Token exchange endpoint
    path('token-exchange/', zoho_token_exchange, name='zoho_token_exchange'),
    
    # Data retrieval endpoints
    path('contacts/', zoho_contacts, name='zoho_contacts'),
    path('leads/', zoho_leads, name='zoho_leads'),
    path('deals/', zoho_deals, name='zoho_deals'),
    
    # Data creation endpoints
    path('contacts/create/', zoho_create_contact, name='zoho_create_contact'),
]