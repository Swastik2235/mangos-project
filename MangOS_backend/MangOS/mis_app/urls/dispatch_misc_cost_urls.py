from mis_app.views.Dispatch_and_misc_costs import DispatchAndMiscCostsViewSet
from django.urls import path, include

urlpatterns = [
    path('get-dispatch-and-misc-costs/', DispatchAndMiscCostsViewSet.as_view({'get':'get_dispatch_and_misc_costs'})),
    path('add-dispatch-and-misc-costs/', DispatchAndMiscCostsViewSet.as_view({'post':'add_dispatch_and_misc_costs'})),
    path('update-dispatch-and-misc-costs/', DispatchAndMiscCostsViewSet.as_view({'put':'update_dispatch_and_misc_costs'})),
    path('delete-dispatch-and-misc-costs/', DispatchAndMiscCostsViewSet.as_view({'delete':'delete_dispatch_and_misc_costs'})),

]