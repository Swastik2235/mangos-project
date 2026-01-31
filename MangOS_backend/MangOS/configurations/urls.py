"""
URL configuration for configurations project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('employee/', include('setup.urls.employee_urls')),
    path('bom-sheet/', include('setup.urls.bomsheet_urls')),
    path('job-card/', include('setup.urls.jobcard_urls')),
    path('machine-master/', include('setup.urls.machinemaster_urls')),
    path('item-master/',include('setup.urls.item_master_urls')),
    path('machine-material/', include('setup.urls.machinematerial_urls')),
    path('maintenance-record/', include('setup.urls.maintenancerecord_urls')),
    path('inventory-item/', include('setup.urls.inventoryitem_urls')),
    path('inventory-category/', include('setup.urls.inventorycategory_urls')),
    path('client-details/', include('setup.urls.clientdetails_urls')),
    path('project-details/',include('setup.urls.project_details_urls')),
    path('step/',include('setup.urls.step_urls')),
    path('workflow/',include('setup.urls.workflow_urls')),
    path('stock-details/',include('setup.urls.stock_details_urls')),
    path('stock-movement-details/',include('setup.urls.stock_movement_urls')),
    path('qr-code/',include('setup.urls.qrcode_urls')),
    path('mis_app/auditLogs/',include('mis_app.urls.audit_log_urls')),
    path('mis_app/client-transaction/',include('mis_app.urls.client_transactions_urls')),
    path('mis_app/client/',include('mis_app.urls.client_urls')),
    path('mis_app/consumable-costs/',include('mis_app.urls.consumable_urls')),
    path('mis_app/cost/',include('mis_app.urls.cost_urls')),
    path('mis_app/critical-costs/',include('mis_app.urls.critical_cost_urls')),
    path('mis_app/daily-cost/',include('mis_app.urls.daily_cost_urls')),
    path('mis_app/daily-financial-summary/',include('mis_app.urls.daily_financial_summary_urls')),
    path('mis_app/department/',include('mis_app.urls.departement_urls')),
    path('mis_app/dispatch-and-misc-costs/',include('mis_app.urls.dispatch_misc_cost_urls')),
    path('mis_app/fabrication-plus-galavanizing/',include('mis_app.urls.fab_plus_galva_urls')),
    path('mis_app/fabrication/',include('mis_app.urls.fab_production_urls')),
    path('mis_app/galvanizing/',include('mis_app.urls.galva_urls')),
    path('mis_app/invoice/',include('mis_app.urls.invoice_urls')),
    path('mis_app/manpower-costs/',include('mis_app.urls.manpower_cost_urls')),
    path('mis_app/Profit-and-loss/',include('mis_app.urls.pnl_urls')),
    path('mis_app/production-summary/',include('mis_app.urls.prod_summary_urls')),
    path('mis_app/project/',include('mis_app.urls.projects_urls')),
    path('mis_app/sale/',include('mis_app.urls.sale_urls')),
    path('mis_app/salesorders/',include('mis_app.urls.salesorder_urls')),
    path('mis_app/scrap-metrics/',include('mis_app.urls.scrap_metrics_urls')),
    path('mis_app/solar/',include('mis_app.urls.solar_urls')),
    path('mis_app/transaction-progress/',include('mis_app.urls.transaction_progress_urls')),
    path('mis_app/user/',include('mis_app.urls.user_urls')),
    path('mis_app/zinc-metrics/',include('mis_app.urls.zinc_metrics_urls')),
    path('mis_app/highlights/',include('mis_app.urls.highlights_urls')),
    path('file/',include('setup.urls.file_urls')),
    path('sales/',include('setup.urls.sale_urls')),
    path('user/',include('setup.urls.user_urls')),
    path('api/zoho/', include('setup.urls.zoho_crm_urls')),


]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
