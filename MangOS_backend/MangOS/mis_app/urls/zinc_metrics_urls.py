from mis_app.views.Zinc_metrics import ZincSavingMetricsViewSet
from django.urls import path, include

urlpatterns = [
    path('get-zinc-metrics/', ZincSavingMetricsViewSet.as_view({'get': 'get_metrics'})),
    path('add-zinc-metrics/', ZincSavingMetricsViewSet.as_view({'post': 'add_metrics'})),
    path('update-zinc-metrics/', ZincSavingMetricsViewSet.as_view({'put': 'update_metrics'})),
    path('delete-zinc-metrics/', ZincSavingMetricsViewSet.as_view({'delete': 'delete_metrics'})),
]