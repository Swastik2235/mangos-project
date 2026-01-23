from mis_app.views.client_transactions import ClientTransactionViewSet
from django.urls import path, include

urlpatterns = [
    path('get-client-transactions/', ClientTransactionViewSet.as_view({'get': 'get_client_transactions'})),
    path('add-client-transaction/', ClientTransactionViewSet.as_view({'post': 'add_client_transaction'})),
    path('update-client-transaction/', ClientTransactionViewSet.as_view({'put': 'update_client_transaction'})),
    path('delete-client-transaction/', ClientTransactionViewSet.as_view({'delete': 'delete_client_transaction'})),
]
