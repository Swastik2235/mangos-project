from mis_app.serializers.client_transactions_serializers import ClientTransactionSerializer
from mis_app.models import ClientTransaction
from rest_framework import viewsets, status
from django.http import JsonResponse
from django.shortcuts import get_object_or_404

class ClientTransactionViewSet(viewsets.ModelViewSet):
    serializer_class = ClientTransactionSerializer

    def get_client_transactions(self, request):
        try:
            transactions = ClientTransaction.objects.all()
            serializer = ClientTransactionSerializer(transactions, many=True)
            return JsonResponse({
                "success": True,
                "status": status.HTTP_200_OK,
                "message": "Client transactions retrieved successfully",
                "data": serializer.data
            })
        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Failed to retrieve client transactions",
                "errors": str(e)
            })

    def add_client_transaction(self, request):
        try:
            serializer = ClientTransactionSerializer(data=request.data)
            if serializer.is_valid():
                transaction = serializer.save()
                return JsonResponse({
                    "success": True,
                    "status": status.HTTP_201_CREATED,
                    "message": "Client transaction added successfully",
                    "data": {
                        "id": transaction.id
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
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "Failed to add client transaction",
                "errors": str(e)
            })

    def update_client_transaction(self, request):
        try:
            transaction_id = request.GET.get("transaction_id")
            if not transaction_id:
                return JsonResponse({
                    "success": False,
                    "status": status.HTTP_400_BAD_REQUEST,
                    "message": "Missing 'transaction_id' in query parameters.",
                    "data": {}
                })

            transaction = get_object_or_404(ClientTransaction, pk=transaction_id)
            serializer = ClientTransactionSerializer(transaction, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return JsonResponse({
                    "success": True,
                    "status": status.HTTP_200_OK,
                    "message": "Client transaction updated successfully",
                    "data": {
                        "client_transaction": serializer.data
                    }
                })

            return JsonResponse({
                "success": False,
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "Invalid field",
                "errors": serializer.errors
            })

        except ClientTransaction.DoesNotExist:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_404_NOT_FOUND,
                "message": "Client transaction not found",
                "data": {}
            })

        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Failed to update client transaction",
                "errors": str(e)
            })

    def delete_client_transaction(self, request):
        try:
            transaction_id = request.GET.get("id")
            if not transaction_id:
                return JsonResponse({
                    "success": False,
                    "status": 400,
                    "message": "Missing id parameter."
                })

            try:
                transaction_id = int(transaction_id)
            except ValueError:
                return JsonResponse({
                    "success": False,
                    "status": 400,
                    "message": "Invalid id format. Must be an integer."
                })

            transaction = get_object_or_404(ClientTransaction, id=transaction_id)
            transaction.delete()

            return JsonResponse({
                "success": True,
                "status": status.HTTP_200_OK,
                "message": "Client transaction deleted successfully."
            })

        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Failed to delete client transaction.",
                "errors": str(e),
            })
