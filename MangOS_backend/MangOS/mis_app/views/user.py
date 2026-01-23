from rest_framework import viewsets
from django.http import JsonResponse, HttpResponse
from rest_framework import status
from mis_app.models import User  
from mis_app.serializers.user_serializers import UserSerializer

class UserViewSet(viewsets.ViewSet):
    serializer_class = UserSerializer
    """
    A simple ViewSet for basic CRUD operations on User.
    """
    def get_users(self,request):
        """
        List all users.
        """
        try:
            users = User.objects.all()
            serializer = UserSerializer(users, many=True)
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:  
            return JsonResponse({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

    def add_user(self, request):
        """
        Create a new user.
        """
        try:
            serializer = UserSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:  
            return JsonResponse({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def update_user(self, request):
        """
        Update an existing user.
        """
        try:
            user = request.GET.get('id')
            serializer = UserSerializer(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=status.HTTP_200_OK)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return JsonResponse({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:  
            return JsonResponse({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def delete_user(self, request):
        """
        Delete a user.
        """
        try:
            user = request.GET.get('id')
            user.delete()
            return JsonResponse(status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return JsonResponse({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:  
            return JsonResponse({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def get_user_by_id(self, request):
        """
        Retrieve a user by ID.
        """
        try:
            user = request.GET.get('id')
            if not user:
                return JsonResponse({"error": "ID parameter is required"}, status=status.HTTP_400_BAD_REQUEST)
            serializer = UserSerializer(user)
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return JsonResponse({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:  
            return JsonResponse({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        


