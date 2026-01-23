from mis_app.views.scrap_metrics import ScrapMetricsViewSet
from django.urls import path, include

urlpatterns = [
    path('get-scrap-metrics/', ScrapMetricsViewSet.as_view({'get': 'get_scrap_metrics'})),
    path('add-scrap-metrics/', ScrapMetricsViewSet.as_view({'post': 'add_scrap_metrics'})),
    path('update-scrap-metrics/', ScrapMetricsViewSet.as_view({'put': 'update_scrap_metrics'})),
    path('delete-scrap-metrics/', ScrapMetricsViewSet.as_view({'delete': 'delete_scrap_metrics'})),

]
