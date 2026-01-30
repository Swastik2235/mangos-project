import requests
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.conf import settings
import os

# Zoho OAuth configuration
ZOHO_CLIENT_ID = os.environ.get('ZOHO_CLIENT_ID', '1000.41SOIG7073OKN5GHZHE8EASX1VXQ2S')
ZOHO_CLIENT_SECRET = os.environ.get('ZOHO_CLIENT_SECRET', '054329d1f2ecf830767fdf782dd97b96126bf50228')
ZOHO_REDIRECT_URI = 'https://mangos-frontend.onrender.com/zoho-oauth-callback'
ZOHO_AUTH_URL = 'https://accounts.zoho.in/oauth/v2'

@csrf_exempt
@require_http_methods(["POST"])
def exchange_token(request):
    """
    Exchange authorization code for access token
    """
    try:
        data = json.loads(request.body)
        code = data.get('code')
        
        if not code:
            return JsonResponse({'error': 'Authorization code is required'}, status=400)
        
        # Prepare token exchange request
        token_data = {
            'grant_type': 'authorization_code',
            'client_id': ZOHO_CLIENT_ID,
            'client_secret': ZOHO_CLIENT_SECRET,
            'redirect_uri': ZOHO_REDIRECT_URI,
            'code': code
        }
        
        # Make request to Zoho token endpoint
        response = requests.post(
            f'{ZOHO_AUTH_URL}/token',
            data=token_data,
            headers={
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        )
        
        if response.status_code == 200:
            token_response = response.json()
            return JsonResponse(token_response)
        else:
            error_data = response.json() if response.content else {'error': 'Token exchange failed'}
            return JsonResponse({
                'error': 'Token exchange failed',
                'details': error_data,
                'status_code': response.status_code
            }, status=400)
            
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON in request body'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
@require_http_methods(["POST"])
def refresh_token(request):
    """
    Refresh access token using refresh token
    """
    try:
        data = json.loads(request.body)
        refresh_token = data.get('refresh_token')
        
        if not refresh_token:
            return JsonResponse({'error': 'Refresh token is required'}, status=400)
        
        # Prepare refresh token request
        token_data = {
            'grant_type': 'refresh_token',
            'client_id': ZOHO_CLIENT_ID,
            'client_secret': ZOHO_CLIENT_SECRET,
            'refresh_token': refresh_token
        }
        
        # Make request to Zoho token endpoint
        response = requests.post(
            f'{ZOHO_AUTH_URL}/token',
            data=token_data,
            headers={
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        )
        
        if response.status_code == 200:
            token_response = response.json()
            return JsonResponse(token_response)
        else:
            error_data = response.json() if response.content else {'error': 'Token refresh failed'}
            return JsonResponse({
                'error': 'Token refresh failed',
                'details': error_data,
                'status_code': response.status_code
            }, status=400)
            
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON in request body'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)