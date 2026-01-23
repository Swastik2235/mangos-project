from django.urls import path
from setup.views.mis_data import SalesViewSet,CostViewSet,EarningViewSet

urlpatterns = [

    #sale
    path(r'create-sales/',SalesViewSet.as_view({'post':'create'})),
    path(r'get-sales/',SalesViewSet.as_view({'get':'list'})),
    path(r'get-sales-report/',SalesViewSet.as_view({'get':'get_sales_report'})),
    
    

    
    
    #cost
    path(r'create-cost/',CostViewSet.as_view({'post':'create'})),
    path(r'get-cost-report/',CostViewSet.as_view({'get':'get_cost_report'})),
    
    
    
    #earning   
    path(r'get-earning-report/',EarningViewSet.as_view({'get':'get_earnings_report'})),
    
    
    #highlight
    path(r'get-highlight-report/',EarningViewSet.as_view({'get':'get_highlight_report'})),
    
    path(r'get-total-production-chart-data/',EarningViewSet.as_view({'get':'get_production_chart_data'})),
    
    path(r'get-earning-chart-data/',EarningViewSet.as_view({'get':'get_earnings_chart'})),
    
    
    path(r'get-sale-chart-data/',EarningViewSet.as_view({'get':'get_total_sales_chart'})),
    path(r'get-cost-chart-data/',EarningViewSet.as_view({'get':'get_total_cost_chart'})),
    
    path(r'get-sales-cost-ratio/',EarningViewSet.as_view({'get':'get_sales_cost_ratio'})),
    path(r'get-sales-cost-ratio-today/',EarningViewSet.as_view({'get':'get_sales_cost_ratio_today'})),
    
    path(r'get-earnings-sales-ratio/',EarningViewSet.as_view({'get':'get_earnings_sales_ratio'})),
    
    path(r'get-earnings-sales-ratio-today/',EarningViewSet.as_view({'get':'get_earnings_sales_ratio_today'})),
    
    path(r'get-sales-tonnage-ratio/',EarningViewSet.as_view({'get':'get_sales_tonnage_ratio'})),
    
    path(r'get-todays-revenue/',EarningViewSet.as_view({'get':'get_today_sales_tonnage_ratio'})),
    
    path(r'get-today-sales-cost-ratio/',EarningViewSet.as_view({'get':'get_today_sales_cost_ratio'})),
    
    path(r'get-cost-to-earnings-ratio/',EarningViewSet.as_view({'get':'get_cost_to_earnings_ratio'})),
    
    
    
    
    ]