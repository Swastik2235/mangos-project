from django.urls import path
from mis_app.views.daily_financial_summary import DailyFinancialSummaryViewSet

urlpatterns = [
    path('get-daily-summary/', DailyFinancialSummaryViewSet.as_view({'get': 'get_daily_financial_summary'})),
    path('add-daily-summary/', DailyFinancialSummaryViewSet.as_view({'post': 'add_daily_financial_summary'})),
    path('update-daily-summary/', DailyFinancialSummaryViewSet.as_view({'put': 'update_daily_financial_summary'})),
    path('delete-daily-summary/', DailyFinancialSummaryViewSet.as_view({'delete': 'delete_daily_financial_summary'})),
    path('get-total-sale/', DailyFinancialSummaryViewSet.as_view({'get': 'get_total_sale_value'})),
    path('get-total-cost/', DailyFinancialSummaryViewSet.as_view({'get': 'get_total_cost_incurred'})),
]
