from mis_app.views.highlights import HighlightsReportViewSet
from django.urls import path, include

urlpatterns = [
    path('highlights-report/', HighlightsReportViewSet.as_view({'get': 'show_highlights_table'})),
    path('highlights-sales-report/', HighlightsReportViewSet.as_view({'get': 'show_sales_highlights_tables'})),
    path('highlights-cost-report/', HighlightsReportViewSet.as_view({'get': 'show_cost_highlights_tables'})),
    path('highlights-earnings-report/', HighlightsReportViewSet.as_view({'get': 'show_daily_earnings_report'})),
    path('daily-total-prod-cost-chart/', HighlightsReportViewSet.as_view({'get': 'show_daily_production_cost_report'})),
]


