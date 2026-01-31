# Zoho CRM Integration Views
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.conf import settings
import requests
import json
import logging

logger = logging.getLogger(__name__)

# Zoho CRM API endpoints
ZOHO_TOKEN_URL = 'https://accounts.zoho.in/oauth/v2/token'
ZOHO_API_BASE = 'https://www.zohoapis.in/crm/v2'

# Your Zoho credentials (these should be in environment variables)
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
        
        logger.info(f"Exchanging authorization code for token")
        
        # Exchange code for token with Zoho
        token_response = requests.post(ZOHO_TOKEN_URL, data={
            'grant_type': 'authorization_code',
            'client_id': ZOHO_CLIENT_ID,
            'client_secret': ZOHO_CLIENT_SECRET,
            'redirect_uri': ZOHO_REDIRECT_URI,
            'code': code
        })
        
        logger.info(f"Zoho token response status: {token_response.status_code}")
        
        if token_response.status_code == 200:
            token_data = token_response.json()
            logger.info("Token exchange successful")
            return JsonResponse(token_data)
        else:
            logger.error(f"Token exchange failed: {token_response.text}")
            return JsonResponse({
                'error': 'Token exchange failed',
                'details': token_response.text
            }, status=token_response.status_code)
            
    except Exception as e:
        logger.error(f"Token exchange error: {str(e)}")
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
        logger.info("Fetching contacts from Zoho CRM")
        
        # Call Zoho API
        response = requests.get(f'{ZOHO_API_BASE}/Contacts', 
            headers={'Authorization': f'Zoho-oauthtoken {token}'},
            params={'per_page': 200}
        )
        
        logger.info(f"Zoho contacts response status: {response.status_code}")
        
        if response.status_code == 200:
            contacts_data = response.json()
            logger.info(f"Successfully fetched {len(contacts_data.get('data', []))} contacts")
            return JsonResponse(contacts_data)
        else:
            logger.error(f"Failed to fetch contacts: {response.text}")
            return JsonResponse({
                'error': 'Failed to fetch contacts',
                'details': response.text
            }, status=response.status_code)
            
    except Exception as e:
        logger.error(f"Contacts fetch error: {str(e)}")
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
        logger.info("Fetching leads from Zoho CRM")
        
        response = requests.get(f'{ZOHO_API_BASE}/Leads', 
            headers={'Authorization': f'Zoho-oauthtoken {token}'},
            params={'per_page': 200}
        )
        
        logger.info(f"Zoho leads response status: {response.status_code}")
        
        if response.status_code == 200:
            leads_data = response.json()
            logger.info(f"Successfully fetched {len(leads_data.get('data', []))} leads")
            return JsonResponse(leads_data)
        else:
            logger.error(f"Failed to fetch leads: {response.text}")
            return JsonResponse({
                'error': 'Failed to fetch leads',
                'details': response.text
            }, status=response.status_code)
            
    except Exception as e:
        logger.error(f"Leads fetch error: {str(e)}")
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
        logger.info("Fetching deals from Zoho CRM")
        
        response = requests.get(f'{ZOHO_API_BASE}/Deals', 
            headers={'Authorization': f'Zoho-oauthtoken {token}'},
            params={'per_page': 200}
        )
        
        logger.info(f"Zoho deals response status: {response.status_code}")
        
        if response.status_code == 200:
            deals_data = response.json()
            logger.info(f"Successfully fetched {len(deals_data.get('data', []))} deals")
            return JsonResponse(deals_data)
        else:
            logger.error(f"Failed to fetch deals: {response.text}")
            return JsonResponse({
                'error': 'Failed to fetch deals',
                'details': response.text
            }, status=response.status_code)
            
    except Exception as e:
        logger.error(f"Deals fetch error: {str(e)}")
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
@require_http_methods(["POST"])
def zoho_create_contact(request):
    """Create a new contact in Zoho CRM"""
    try:
        auth_header = request.headers.get('Authorization', '')
        if not auth_header.startswith('Bearer '):
            return JsonResponse({'error': 'Authorization token required'}, status=401)
        
        token = auth_header.replace('Bearer ', '')
        contact_data = json.loads(request.body)
        
        logger.info("Creating contact in Zoho CRM")
        
        response = requests.post(f'{ZOHO_API_BASE}/Contacts', 
            headers={
                'Authorization': f'Zoho-oauthtoken {token}',
                'Content-Type': 'application/json'
            },
            json={'data': [contact_data]}
        )
        
        logger.info(f"Zoho create contact response status: {response.status_code}")
        
        if response.status_code == 201:
            result = response.json()
            logger.info("Contact created successfully")
            return JsonResponse(result)
        else:
            logger.error(f"Failed to create contact: {response.text}")
            return JsonResponse({
                'error': 'Failed to create contact',
                'details': response.text
            }, status=response.status_code)
            
    except Exception as e:
        logger.error(f"Create contact error: {str(e)}")
        return JsonResponse({'error': str(e)}, status=500)