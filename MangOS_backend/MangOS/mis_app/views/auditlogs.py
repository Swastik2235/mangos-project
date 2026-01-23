from mis_app.serializers.audit_logs_serializers import AuditLogSerializer
from mis_app.models import AuditLog
from rest_framework import viewsets, status
from django.http import JsonResponse
from django.shortcuts import get_object_or_404

class AuditLogViewSet(viewsets.ModelViewSet):
    serializer_class = AuditLogSerializer

    def get_auditlogs(self, request):
        try:
            audit_logs = AuditLog.objects.all()
            serializer = AuditLogSerializer(audit_logs, many=True)
            return JsonResponse({
                "success": True,
                "status": status.HTTP_200_OK,
                "message": "Audit logs retrieved successfully",
                "data": serializer.data
            })
        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Failed to retrieve audit logs",
                "errors": str(e)
            })

    def add_auditlog(self, request):
        try:
            serializer = AuditLogSerializer(data=request.data)
            if serializer.is_valid():
                audit_log = serializer.save()
                return JsonResponse({
                    "success": True,
                    "status": status.HTTP_201_CREATED,
                    "message": "Audit log added successfully",
                    "data": {
                        'id': audit_log.id
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
                "message": "Failed to add audit log",
                "errors": str(e)
            })

    def update_auditlog(self, request):
        try:
            audit_log_id = request.GET.get("id")
            if not audit_log_id:
                return JsonResponse({
                    "success": False,
                    "status": status.HTTP_400_BAD_REQUEST,
                    "message": "Missing 'id' in query parameters.",
                    "data": {}
                })

            audit_log = get_object_or_404(AuditLog, pk=audit_log_id)
            serializer = AuditLogSerializer(audit_log, data=request.data, partial=True)

            if serializer.is_valid():
                serializer.save()
                return JsonResponse({
                    "success": True,
                    "status": status.HTTP_200_OK,
                    "message": "Audit log updated successfully",
                    "data": {
                        "audit_log": serializer.data
                    }
                })

            return JsonResponse({
                "success": False,
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "Invalid field",
                "errors": serializer.errors
            })

        except AuditLog.DoesNotExist:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_404_NOT_FOUND,
                "message": "Audit log not found",
                "data": {}
            })

        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Failed to update audit log",
                "errors": str(e)
            })

    def delete_auditlog(self, request):
        try:
            audit_log_id = request.GET.get("id")
            if not audit_log_id:
                return JsonResponse({
                    "success": False,
                    "status": 400,
                    "message": "Missing id parameter."
                })

            try:
                audit_log_id = int(audit_log_id)
            except ValueError:
                return JsonResponse({
                    "success": False,
                    "status": 400,
                    "message": "Invalid id format. Must be an integer."
                })

            audit_log = get_object_or_404(AuditLog, id=audit_log_id)
            audit_log.delete()

            return JsonResponse({
                "success": True,
                "status": status.HTTP_200_OK,
                "message": "Audit log deleted successfully."
            })

        except Exception as e:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "message": "Failed to delete audit log.",
                "errors": str(e),
            })
