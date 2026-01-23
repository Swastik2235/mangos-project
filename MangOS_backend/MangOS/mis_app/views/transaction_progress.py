from mis_app.serializers.transaction_progress_serializers import TransactionProgressSerializer
from mis_app.models import TransactionProgress
from rest_framework import viewsets, permissions
from django.http import JsonResponse

class TransactionProgressViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows transaction progress to be viewed or edited.
    """
    serializer_class = TransactionProgressSerializer

    def get_transaction_progress(self, request):
        try:
            data = TransactionProgress.objects.all()
            serializer = TransactionProgressSerializer(data, many=True)
            return JsonResponse(serializer.data, safe=False)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
        
    def add_transaction_progress(self, request):
        try:
            serializer = TransactionProgressSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=201)
            return JsonResponse(serializer.errors, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    
    def update_transaction_progress(self, request):
        try:
            data = request.GET.get('id')
            transaction_progress = TransactionProgress.objects.get(id=data)
            serializer = TransactionProgressSerializer(transaction_progress, data=request.data) 
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, status=200)
            return JsonResponse(serializer.errors, status=400)
        except TransactionProgress.DoesNotExist:
            return JsonResponse({'error': 'TransactionProgress not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
        
    def delete_transaction_progress(self, request):
        try:
            data = request.GET.get('id')
            transaction_progress = TransactionProgress.objects.get(id=data)
            transaction_progress.delete()
            return JsonResponse({'message': 'TransactionProgress deleted successfully'}, status=204)
        except TransactionProgress.DoesNotExist:
            return JsonResponse({'error': 'TransactionProgress not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
        

            