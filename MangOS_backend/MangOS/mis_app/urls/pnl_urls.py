from mis_app.views.pnl import ProfitLossSummaryViewSet
from django.urls import path, include

urlpatterns = [
    path('get-ProfitLossSummary/', ProfitLossSummaryViewSet.as_view({'get': 'get_Profit_Loss_Summary'})),
    path('add-ProfitLossSummary/', ProfitLossSummaryViewSet.as_view({'post': 'add_Profit_Loss_Summary'})),
    path('update-ProfitLossSummary/', ProfitLossSummaryViewSet.as_view({'put': 'update_Profit_Loss_Summary'})),
    path('delete-ProfitLossSummary/', ProfitLossSummaryViewSet.as_view({'delete': 'delete_Profit_Loss_Summary'})),
    path('get-ProfitLossSummary-by-date/', ProfitLossSummaryViewSet.as_view({'get': 'get_by_date'})),
    path('get-earnings/',ProfitLossSummaryViewSet.as_view({'get': 'get_earnings'})),
]