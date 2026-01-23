from mis_app.views.transaction_progress import TransactionProgressViewSet
from django.urls import path, include

urlpatterns = [
    path('get-transaction-progress/', TransactionProgressViewSet.as_view({'get': 'get_transaction_progress'})),
    path('add-transaction-progress/', TransactionProgressViewSet.as_view({'post': 'add_transaction_progress'})),
    path('update-transaction-progress/', TransactionProgressViewSet.as_view({'put': 'update_transaction_progress'})),
    path('delete-transaction-progress/', TransactionProgressViewSet.as_view({'delete': 'delete_transaction_progress'})),
]

