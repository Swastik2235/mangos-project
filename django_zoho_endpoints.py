# Add these to your Django views.py

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import requests
import json
import os

# Zoho CRM API endpoints
ZOHO_TOKEN_URL = 'https://accounts.zoho.in/oauth/v2/token'
ZOHO_API_BASE = 'https://www.zohoapis.in/crm/v2'

# Your Zoho credentials (move to environment variables)
ZOHO_CLIENT_ID = '1000.41SOIG7073OKN5GHZHE8EASX1VXQ2S'
ZOHO_CLIENT_SECRET = '054329d1f2ecf830767fdf782dd97b96126bf50228'
ZOHO_REDIRECT_URI = 'https://mangos-frontend.onrender.com/zoho-crm'

@csrf_exempt
@require_http_methods(["POST"])
def zoho_token_exchange(request):
    """Exchange authorization code for access token"""
    try:
        data = json.loads(request.body)
        code = data.get('code')
        
        if not code:
            return JsonResponse({'error': 'Authorization code required'}, status=400)
        
        # Exchange code for token with Zoho
        token_response = requests.post(ZOHO_TOKEN_URL, data={
            'grant_type': 'authorization_code',
            'client_id': ZOHO_CLIENT_ID,
            'client_secret': ZOHO_CLIENT_SECRET,
            'redirect_uri': ZOHO_REDIRECT_URI,
            'code': code
        })
        
        if token_response.status_code == 200:
            return JsonResponse(token_response.json())
        else:
            return JsonResponse({
                'error': 'Token exchange failed',
                'details': token_response.text
            }, status=token_response.status_code)
            
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
@require_http_methods(["GET"])
def zoho_contacts(request):
    """Get contacts from Zoho CRM"""
    try:
        # Get access token from Authorization header
        auth_header = request.headers.get('Authorization', '')
        if not auth_header.startswith('Bearer '):
            return JsonResponse({'error': 'Authorization token required'}, status=401)
        
        token = auth_header.replace('Bearer ', '')
        
        # Call Zoho API
        response = requests.get(f'{ZOHO_API_BASE}/Contacts', 
            headers={'Authorization': f'Zoho-oauthtoken {token}'},
            params={'per_page': 200}
        )
        
        if response.status_code == 200:
            return JsonResponse(response.json())
        else:
            return JsonResponse({
                'error': 'Failed to fetch contacts',
                'details': response.text
            }, status=response.status_code)
            
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
@require_http_methods(["GET"])
def zoho_leads(request):
    """Get leads from Zoho CRM"""
    try:
        auth_header = request.headers.get('Authorization', '')
        if not auth_header.startswith('Bearer '):
            return JsonResponse({'error': 'Authorization token required'}, status=401)
        
        token = auth_header.replace('Bearer ', '')
        
        response = requests.get(f'{ZOHO_API_BASE}/Leads', 
            headers={'Authorization': f'Zoho-oauthtoken {token}'},
            params={'per_page': 200}
        )
        
        if response.status_code == 200:
            return JsonResponse(response.json())
        else:
            return JsonResponse({
                'error': 'Failed to fetch leads',
                'details': response.text
            }, status=response.status_code)
            
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
@require_http_methods(["GET"])
def zoho_deals(request):
    """Get deals from Zoho CRM"""
    try:
        auth_header = request.headers.get('Authorization', '')
        if not auth_header.startswith('Bearer '):
            return JsonResponse({'error': 'Authorization token required'}, status=401)
        
        token = auth_header.replace('Bearer ', '')
        
        response = requests.get(f'{ZOHO_API_BASE}/Deals', 
            headers={'Authorization': f'Zoho-oauthtoken {token}'},
            params={'per_page': 200}
        )
        
        if response.status_code == 200:
            return JsonResponse(response.json())
        else:
            return JsonResponse({
                'error': 'Failed to fetch deals',
                'details': response.text
            }, status=response.status_code)
            
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

# Add to your urls.py:
"""
from django.urls import path
from . import views

urlpatterns = [
    # ... your existing URLs
    path('api/zoho/token-exchange/', views.zoho_token_exchange, name='zoho_token_exchange'),
    path('api/zoho/contacts/', views.zoho_contacts, name='zoho_contacts'),
    path('api/zoho/leads/', views.zoho_leads, name='zoho_leads'),
    path('api/zoho/deals/', views.zoho_deals, name='zoho_deals'),
]
"""