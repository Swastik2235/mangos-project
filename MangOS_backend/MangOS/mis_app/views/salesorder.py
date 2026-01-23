from django.http import JsonResponse
from rest_framework import viewsets, status
from mis_app.models import SalesOrder
from mis_app.serializers.salesorder_serializers import SalesOrderSerializer

class SalesOrderViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows sales orders to be viewed or edited.
    """
    serializer_class = SalesOrderSerializer

    def get_salesorder(self, request):
        """
        Get a list of all sales orders.
        """
        try:
            orders = SalesOrder.objects.all()
            serializer = self.serializer_class(orders, many=True)
            return JsonResponse({'message': 'Sales orders fetched successfully', 'data': serializer.data}, status=status.HTTP_200_OK)
        except Exception as e:
            return JsonResponse({'error': f'An error occurred: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

    def add_salesorder(self, request):
        """
        Add a new sales order.
        """
        try:
            order = SalesOrder.objects.create(
                customer_name=request.data['customer_name'],
                order_date=request.data['order_date'],
                total_amount=request.data['total_amount']
            )
            return JsonResponse({'message': 'Sales order added successfully', 'id': order.id}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return JsonResponse({'error': f'An error occurred: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

    def update_salesorder(self, request):
        """
        Update an existing sales order.
        """
        try:
            # Fetch primary key from GET data
            pk = request.data.GET.get('pk')
            if not pk:
                return JsonResponse({'error': 'Primary key (pk) not provided'}, status=status.HTTP_400_BAD_REQUEST)

            # Fetch the sales order using the primary key
            order = SalesOrder.objects.get(pk=pk)
            order.customer_name = request.data['customer_name']
            order.order_date = request.data['order_date']
            order.total_amount = request.data['total_amount']
            order.save()
            return JsonResponse({'message': 'Sales order updated successfully', 'id': order.id}, status=status.HTTP_200_OK)
        except SalesOrder.DoesNotExist:
            return JsonResponse({'error': 'Sales Order not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return JsonResponse({'error': f'An error occurred: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

    def delete_salesorder(self, request, pk=None):
        """
        Delete a sales order.
        """
        try:
            order = SalesOrder.objects.get(pk=pk)
            order.delete()
            return JsonResponse({'message': 'Sales Order deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except SalesOrder.DoesNotExist:
            return JsonResponse({'error': 'Sales Order not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return JsonResponse({'error': f'An error occurred: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

    def get_salesorder_by_id(self, request, pk=None):
        """
        Get a sales order by ID.
        """
        try:
            order = SalesOrder.objects.get(pk=pk)
            serializer = self.serializer_class(order)
            return JsonResponse({'message': 'Sales order fetched successfully', 'data': serializer.data}, status=status.HTTP_200_OK)
        except SalesOrder.DoesNotExist:
            return JsonResponse({'error': 'Sales Order not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return JsonResponse({'error': f'An error occurred: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)
