from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
import json

@csrf_exempt
def login_user(request):
    # Handle preflight OPTIONS request
    if request.method == 'OPTIONS':
        response = JsonResponse({})
        response["Access-Control-Allow-Origin"] = "*"
        response["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        response["Access-Control-Allow-Headers"] = "Content-Type"
        return response
    
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data.get('email')
            password = data.get('password')
            designation = data.get('designation')
            
            # For now, create a simple authentication
            # You can replace this with your actual authentication logic
            if email and password:
                # Simple validation - replace with your actual logic
                if email == "admin@test.com" and password == "admin123":
                    response = JsonResponse({
                        'success': True,
                        'message': 'Login successful',
                        'token': 'dummy_token_123',
                        'user': {
                            'email': email,
                            'designation': designation
                        }
                    })
                else:
                    response = JsonResponse({
                        'success': False,
                        'message': 'Invalid credentials'
                    }, status=401)
            else:
                response = JsonResponse({
                    'success': False,
                    'message': 'Email and password are required'
                }, status=400)
                
        except json.JSONDecodeError:
            response = JsonResponse({
                'success': False,
                'message': 'Invalid JSON data'
            }, status=400)
    else:
        response = JsonResponse({
            'success': False,
            'message': 'Method not allowed'
        }, status=405)
    
    # Add CORS headers to all responses
    response["Access-Control-Allow-Origin"] = "*"
    response["Access-Control-Allow-Methods"] = "POST, OPTIONS"
    response["Access-Control-Allow-Headers"] = "Content-Type"
    return response
