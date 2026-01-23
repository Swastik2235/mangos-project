from mis_app.models import Client
from mis_app.serializers.client_serializers import ClientSerializer
from rest_framework import viewsets, status
from django.http import JsonResponse
from django.shortcuts import get_object_or_404

class ClientViewSet(viewsets.ViewSet):
    serializer_class = ClientSerializer

    def get_clients(self, request):
        try:
            clients = Client.objects.all()
            serializer = ClientSerializer(clients, many=True)
            return JsonResponse({
                "success": True,
                "status": status.HTTP_200_OK,
                "message": "Clients retrieved successfully",
                "data": serializer.data
            })
        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Failed to retrieve clients",
                "errors": str(e)
            })

    def add_client(self, request):
        try:
            serializer = ClientSerializer(data=request.data)
            if serializer.is_valid():
                client = serializer.save()
                return JsonResponse({
                    "success": True,
                    "status": status.HTTP_201_CREATED,
                    "message": "Client added successfully",
                    "data": {
                        "id": client.id
                    }
                })
            return JsonResponse({
                "success": False,
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "Invalid field",
                "errors": serializer.errors
            })
        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Failed to add client",
                "errors": str(e)
            })

    def update_client(self, request):
        try:
            client_id = request.GET.get("id")
            if not client_id:
                return JsonResponse({
                    "success": False,
                    "status": status.HTTP_400_BAD_REQUEST,
                    "message": "Missing 'id' in query parameters.",
                    "data": {}
                })

            client = get_object_or_404(Client, pk=client_id)
            serializer = ClientSerializer(client, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return JsonResponse({
                    "success": True,
                    "status": status.HTTP_200_OK,
                    "message": "Client updated successfully",
                    "data": {
                        "client": serializer.data
                    }
                })

            return JsonResponse({
                "success": False,
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "Invalid field",
                "errors": serializer.errors
            })

        except Client.DoesNotExist:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_404_NOT_FOUND,
                "message": "Client not found",
                "data": {}
            })

        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Failed to update client",
                "errors": str(e)
            })

    def delete_client(self, request):
        try:
            client_id = request.GET.get("id")
            if not client_id:
                return JsonResponse({
                    "success": False,
                    "status": 400,
                    "message": "Missing id parameter."
                })

            try:
                client_id = int(client_id)
            except ValueError:
                return JsonResponse({
                    "success": False,
                    "status": 400,
                    "message": "Invalid id format. Must be an integer."
                })

            client = get_object_or_404(Client, pk=client_id)
            client.delete()

            return JsonResponse({
                "success": True,
                "status": status.HTTP_200_OK,
                "message": "Client deleted successfully."
            })

        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Failed to delete client.",
                "errors": str(e),
            })
