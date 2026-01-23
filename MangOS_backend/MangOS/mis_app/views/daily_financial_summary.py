from rest_framework import viewsets, status
from django.http import JsonResponse
from mis_app.models import DailyFinancialSummary
from mis_app.serializers.daily_financial_summary_serailizers import DailyFinancialSummarySerializer

class DailyFinancialSummaryViewSet(viewsets.ModelViewSet):
    serializer_class = DailyFinancialSummarySerializer

    def get_daily_financial_summary(self, request, *args, **kwargs):
        date = request.query_params.get('date')
        if not date:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "Date parameter is required."
            })

        try:
            daily_summary = DailyFinancialSummary.objects.get(summary_date=date)
            serializer = self.get_serializer(daily_summary)
            return JsonResponse({
                "success": True,
                "status": status.HTTP_200_OK,
                "message": "Daily financial summary retrieved successfully.",
                "data": serializer.data
            })
        except DailyFinancialSummary.DoesNotExist:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_404_NOT_FOUND,
                "message": "Daily financial summary not found."
            })

    def add_daily_financial_summary(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({
                "success": True,
                "status": status.HTTP_201_CREATED,
                "message": "Daily financial summary created successfully.",
                "data": serializer.data
            })
        return JsonResponse({
            "success": False,
            "status": status.HTTP_400_BAD_REQUEST,
            "message": "Validation failed.",
            "errors": serializer.errors
        })

    def update_daily_financial_summary(self, request):
        daily_id = request.GET.get('id')
        if not daily_id:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "id parameter is required."
            })

        try:
            daily_summary = DailyFinancialSummary.objects.get(pk=daily_id)
            if not daily_summary:
                return JsonResponse({
                    "success": False,
                    "status": status.HTTP_404_NOT_FOUND,
                    "message": "Daily financial summary not found."
                })
            serializer = self.get_serializer(daily_summary, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse({
                    "success": True,
                    "status": status.HTTP_200_OK,
                    "message": "Daily financial summary updated successfully.",
                    "data": serializer.data
                })
            return JsonResponse({
                "success": False,
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "Validation failed.",
                "errors": serializer.errors
            })
        except DailyFinancialSummary.DoesNotExist:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_404_NOT_FOUND,
                "message": "Daily financial summary not found."
            })

    def delete_daily_financial_summary(self, request):
        daily_id = request.GET.get('id')
        if not daily_id:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "id parameter is required."
            })

        try:
            daily_summary = DailyFinancialSummary.objects.get(pk=daily_id)
            daily_summary.delete()
            return JsonResponse({
                "success": True,
                "status": status.HTTP_204_NO_CONTENT,
                "message": "Daily financial summary deleted successfully."
            })
        except DailyFinancialSummary.DoesNotExist:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_404_NOT_FOUND,
                "message": "Daily financial summary not found."
            })

    def get_total_sale_value(self, request):
        date = request.GET.get('date')
        if not date:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "Date parameter is required."
            })

        try:
            daily_summary = DailyFinancialSummary.objects.get(summary_date=date)
            return JsonResponse({
                "success": True,
                "status": status.HTTP_200_OK,
                "message": "Total sale value retrieved successfully.",
                "data": {"total_sale_value": daily_summary.total_sale_value}
            })
        except DailyFinancialSummary.DoesNotExist:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_404_NOT_FOUND,
                "message": "Daily financial summary not found."
            })

    def get_total_cost_incurred(self, request):
        date = request.GET.get('date')
        if not date:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_400_BAD_REQUEST,
                "message": "Date parameter is required."
            })

        try:
            daily_summary = DailyFinancialSummary.objects.get(summary_date=date)
            return JsonResponse({
                "success": True,
                "status": status.HTTP_200_OK,
                "message": "Total cost incurred retrieved successfully.",
                "data": {"total_cost_incurred": daily_summary.total_cost_incurred}
            })
        except DailyFinancialSummary.DoesNotExist:
            return JsonResponse({
                "success": False,
                "status": status.HTTP_404_NOT_FOUND,
                "message": "Daily financial summary not found."
            })
