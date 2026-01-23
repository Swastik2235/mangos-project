from mis_app.models import Invoice
from mis_app.serializers.invoice_serializers import InvoiceSerializer
from django.http import JsonResponse
from rest_framework import viewsets, status

class InvoiceViewSet(viewsets.ModelViewSet):
    serializer_class = InvoiceSerializer

    def get_invoice(self, request, *args, **kwargs):
        """
        Get invoice data using GET for invoice ID.
        """
        try:
            invoice_id = request.GET.get('invoice_id')
            if not invoice_id:
                return JsonResponse({'error': 'Invoice ID is required'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                invoice = Invoice.objects.get(id=invoice_id)
                serializer = self.get_serializer(invoice)
                return JsonResponse(serializer.data, status=status.HTTP_200_OK)
            except Invoice.DoesNotExist:
                return JsonResponse({'error': 'Invoice not found'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return JsonResponse({'error': f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def add_invoice(self, request, *args, **kwargs):
        """
        Add a new invoice.
        """
        try:
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({'message': 'Invoice created successfully', 'data': serializer.data}, status=status.HTTP_201_CREATED)
            return JsonResponse({'error': 'Invalid data', 'details': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return JsonResponse({'error': f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def update_invoice(self, request, *args, **kwargs):
        """
        Update an existing invoice.
        """
        try:
            invoice_id = request.GET.get('invoice_id')
            if not invoice_id:
                return JsonResponse({'error': 'Invoice ID is required'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                invoice = Invoice.objects.get(id=invoice_id)
                serializer = self.get_serializer(invoice, data=request.data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    return JsonResponse({'message': 'Invoice updated successfully', 'data': serializer.data}, status=status.HTTP_200_OK)
                return JsonResponse({'error': 'Invalid data', 'details': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
            except Invoice.DoesNotExist:
                return JsonResponse({'error': 'Invoice not found'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return JsonResponse({'error': f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete_invoice(self, request, *args, **kwargs):
        """
        Delete an invoice.
        """
        try:
            invoice_id = request.GET.get('invoice_id')
            if not invoice_id:
                return JsonResponse({'error': 'Invoice ID is required'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                invoice = Invoice.objects.get(id=invoice_id)
                invoice.delete()
                return JsonResponse({'message': 'Invoice deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
            except Invoice.DoesNotExist:
                return JsonResponse({'error': 'Invoice not found'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return JsonResponse({'error': f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def get_invoice_by_customer(self, request, *args, **kwargs):
        """
        Get invoices by customer ID.
        """
        try:
            customer_id = request.GET.get('customer_id')
            if not customer_id:
                return JsonResponse({'error': 'Customer ID is required'}, status=status.HTTP_400_BAD_REQUEST)

            invoices = Invoice.objects.filter(customer_id=customer_id)
            if invoices:
                serializer = self.get_serializer(invoices, many=True)
                return JsonResponse({'message': 'Invoices fetched successfully', 'data': serializer.data}, status=status.HTTP_200_OK)
            else:
                return JsonResponse({'error': 'No invoices found for this customer'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return JsonResponse({'error': f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get_invoice_by_id(self, request, *args, **kwargs):
        """
        Get invoice by ID using GET for invoice ID.
        """
        try:
            invoice_id = request.GET.get('invoice_id')
            if not invoice_id:
                return JsonResponse({'error': 'Invoice ID is required'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                invoice = Invoice.objects.get(id=invoice_id)
                serializer = self.get_serializer(invoice)
                return JsonResponse({'message': 'Invoice fetched successfully', 'data': serializer.data}, status=status.HTTP_200_OK)
            except Invoice.DoesNotExist:
                return JsonResponse({'error': 'Invoice not found'}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return JsonResponse({'error': f"An error occurred: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 
