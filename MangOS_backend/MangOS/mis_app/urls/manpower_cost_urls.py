from mis_app.views.manpower_cost import ManpowerCostViewSet
from django.urls import path, include

urlpatterns = [
    path('get-manpowercost/', ManpowerCostViewSet.as_view({'get': 'get_manpowercost'})),
    path('add-manpowercost/', ManpowerCostViewSet.as_view({'post': 'add_manpowercost'})),
    path('update-manpowercost/', ManpowerCostViewSet.as_view({'put': 'update_manpowercost'})),
    path('delete-manpowercost/', ManpowerCostViewSet.as_view({'delete': 'delete_manpowercost'})),
    path('get-manpowercost-by-roletype/', ManpowerCostViewSet.as_view({'get': 'get_manpowercost_by_type'})),
    path('get-manpowercost-by-id/', ManpowerCostViewSet.as_view({'get': 'get_manpowercost_by_id'})),
    path('get-total-manpowercost/', ManpowerCostViewSet.as_view({'get': 'get_total_manpowercost'})),
]