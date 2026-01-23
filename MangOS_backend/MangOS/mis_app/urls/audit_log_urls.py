from mis_app.views.auditlogs import AuditLogViewSet
from django.urls import path, include

urlpatterns = [
    path('get-auditlogs/', AuditLogViewSet.as_view({'get': 'get_auditlogs'})),
    path('add-auditlog/', AuditLogViewSet.as_view({'post': 'add_auditlog'})),
    path('update-auditlog/', AuditLogViewSet.as_view({'put': 'update_auditlog'})),
    path('delete-auditlog/', AuditLogViewSet.as_view({'delete': 'delete_auditlog'})),

]

