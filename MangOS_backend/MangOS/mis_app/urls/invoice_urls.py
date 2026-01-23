from mis_app.views.invoice import InvoiceViewSet
from django.urls import path, include

urlpatterns = [
    path('get-invoice/', InvoiceViewSet.as_view({'get': 'get_invoice'})),
    path('add-invoice/', InvoiceViewSet.as_view({'post': 'add_invoice'})),
    path('update-invoice/', InvoiceViewSet.as_view({'put': 'update_invoice'})),
    path('delete-invoice/', InvoiceViewSet.as_view({'delete': 'delete_invoice'})),
    path('get-invoice-by-customer/',InvoiceViewSet.as_view({'get': 'get_invoice_by_customer'})),
    path('get-invoice-by-id/',InvoiceViewSet.as_view({'get': 'get_invoice_by_id'})),

]