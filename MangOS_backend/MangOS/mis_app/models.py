from django.db import models
from django.utils import timezone
from django.contrib.postgres.fields import ArrayField

class Departement(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

class User(models.Model):
    username = models.CharField(max_length=150, blank=True, null=True)
    role = models.CharField(max_length=250, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    contact = models.CharField(max_length=20, blank=True, null=True)
    department = models.ForeignKey(Departement, on_delete=models.SET_NULL, null=True, blank=True, related_name='users')
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)
    is_active = models.BooleanField(default=True, blank=True, null=True)
    is_superuser = models.BooleanField(default=False, blank=True, null=True)

class Client(models.Model):
    CLIENT_TYPE_CHOICES = [
        ('Internal', 'Internal'),
        ('External', 'External'),
    ]
    
    name = models.CharField(max_length=255, blank=True, null=True)
    contact_info = models.TextField(blank=True, null=True)
    client_type = models.CharField(max_length=25, choices=CLIENT_TYPE_CHOICES, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    city = models.CharField(max_length=250, blank=True, null=True)
    state = models.CharField(max_length=250, blank=True, null=True)
    postal_code = models.CharField(max_length=20, blank=True, null=True)
    country = models.CharField(max_length=250, blank=True, null=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    email_address = models.EmailField(blank=True, null=True)
    industry = models.CharField(max_length=250, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

class Project(models.Model):
    client = models.ForeignKey(Client, on_delete=models.PROTECT, related_name='projects', blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    category = models.CharField(max_length=255, blank=True, null=True)
    unit = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

class SalesOrder(models.Model):
    STATUS_CHOICES = [
        ('Draft', 'Draft'),
        ('Pending Approval', 'Pending Approval'),
        ('Confirmed', 'Confirmed'),
        ('In Production', 'In Production'),
        ('Ready for Dispatch', 'Ready for Dispatch'),
        ('Shipped', 'Shipped'),
        ('Completed', 'Completed'),
        ('Cancelled', 'Cancelled'),
    ]
    
    order_number = models.CharField(max_length=50, unique=True, blank=True, null=True)
    client = models.ForeignKey(Client, on_delete=models.PROTECT, blank=True, null=True)
    project = models.ForeignKey(Project, on_delete=models.PROTECT, blank=True, null=True)
    order_date = models.DateField(blank=True, null=True)
    item_description = models.TextField(blank=True, null=True)
    quantity_ordered = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    unit = models.CharField(max_length=20, blank=True, null=True)
    unit_price_quoted = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    estimated_delivery_date = models.DateField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Draft', blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.PROTECT, related_name='created_orders', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    last_updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)

class Invoice(models.Model):
    STATUS_CHOICES = [
        ('Draft', 'Draft'),
        ('Sent', 'Sent'),
        ('Partially Paid', 'Partially Paid'),
        ('Paid', 'Paid'),
        ('Overdue', 'Overdue'),
        ('Void', 'Void'),
        ('Cancelled', 'Cancelled'),
    ]
    
    invoice_number = models.CharField(max_length=50, unique=True, blank=True, null=True)
    sales_order = models.ForeignKey(SalesOrder, on_delete=models.PROTECT, blank=True, null=True)
    client = models.ForeignKey(Client, on_delete=models.PROTECT, blank=True, null=True)
    project = models.ForeignKey(Project, on_delete=models.PROTECT, blank=True, null=True)
    invoice_date = models.DateField(blank=True, null=True)
    due_date = models.DateField(blank=True, null=True)
    subtotal_amount = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    tax_amount = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    amount_paid = models.DecimalField(max_digits=12, decimal_places=2, default=0, blank=True, null=True)
    balance_due = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Draft', blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

class FabricationProduction(models.Model):
    SUB_TYPE_CHOICES = [
        ('Own Steel - Towers', 'Own Steel - Towers'),
        ('Job Work - Towers', 'Job Work - Towers'),
    ]
    
    production_date = models.DateField(blank=True, null=True)
    department = models.ForeignKey(Departement, on_delete=models.PROTECT, blank=True, null=True)
    project = models.ForeignKey(Project, on_delete=models.PROTECT, blank=True, null=True)
    own_steel_towers_quantity = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    own_steel_towers_value = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    job_work_towers_quantity = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    job_work_towers_value = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    remarks = models.TextField(blank=True, null=True)
    recorded_by = models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True)
    daily_total_mt = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    daily_total_value = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    sub_type = ArrayField(
        models.CharField(max_length=220, choices=SUB_TYPE_CHOICES), 
        blank=True, 
        null=True,
        size=5  
    )

class GalvanizingProduction(models.Model):
    SUB_TYPE_CHOICES = [
        ('Galvanizing - Own Zinc', 'Galvanizing - Own Zinc'),
        ('Galvanizing - Job Work', 'Galvanizing - Job Work'),
    ]
    
    production_date = models.DateField(blank=True, null=True)
    department = models.ForeignKey(Departement, on_delete=models.PROTECT, blank=True, null=True)
    project = models.ForeignKey(Project, on_delete=models.PROTECT, blank=True, null=True)
    quantity_own_zinc = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    value_own_zinc = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    quantity_job_work = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    value_job_work = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    remarks = models.TextField(blank=True, null=True)
    recorded_by = models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True)
    daily_total_mt = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    daily_total_value = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    sub_type = ArrayField(
        models.CharField(max_length=220, choices=SUB_TYPE_CHOICES), 
        blank=True, 
        null=True,
        size=5  
    )

class FabPlusGalvaProduction(models.Model):
    SUB_TYPE_CHOICES = [
        ('Own Steel - Towers', 'Own Steel - Towers'),
        ('Job Work - Towers', 'Job Work - Towers'),
    ]
    
    production_date = models.DateField(blank=True, null=True)
    department = models.ForeignKey(Departement, on_delete=models.PROTECT, blank=True, null=True)
    project = models.ForeignKey(Project, on_delete=models.PROTECT, blank=True, null=True)
    own_steel_towers_quantity = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    own_steel_towers_value = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    job_work_towers_quantity = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    job_work_towers_value = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    remarks = models.TextField(blank=True, null=True)
    recorded_by = models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True)
    daily_total_mt = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    daily_total_value = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    sub_type = ArrayField(
        models.CharField(max_length=220, choices=SUB_TYPE_CHOICES), 
        blank=True, 
        null=True,
        size=5  
    )

class SolarProduction(models.Model):
    SUB_TYPE_CHOICES = [
        ('Own Steel - Solar', 'Own Steel - Solar'),
        ('Job Work - Solar', 'Job Work - Solar'),
    ]
    
    production_date = models.DateField(blank=True, null=True)
    department = models.ForeignKey(Departement, on_delete=models.PROTECT, blank=True, null=True)
    project = models.ForeignKey(Project, on_delete=models.PROTECT, blank=True, null=True)
    own_steel_towers_quantity = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    own_steel_towers_value = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    job_work_towers_quantity = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    job_work_towers_value = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    remarks = models.TextField(blank=True, null=True)
    recorded_by = models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True)
    daily_total_mt = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    daily_total_value = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    sub_type = ArrayField(
        models.CharField(max_length=220, choices=SUB_TYPE_CHOICES), 
        blank=True, 
        null=True,
        size=5  
    )

class Sale(models.Model):
    SHIFT_CHOICES = [
        ('Morning', 'Morning'),
        ('Evening', 'Evening'),
        ('Night', 'Night'),
    ]
    
    sale_date = models.DateField(blank=True, null=True)
    shift = models.CharField(max_length=25, choices=SHIFT_CHOICES, blank=True, null=True)
    invoice = models.ForeignKey(Invoice, on_delete=models.PROTECT, blank=True, null=True)
    department = models.ForeignKey(Departement, on_delete=models.PROTECT, blank=True, null=True)
    project = models.ForeignKey(Project, on_delete=models.PROTECT, blank=True, null=True)
    tonnage = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    unit_price = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    total_sales = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    earnings = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    recorded_by = models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True)
    related_production = models.ForeignKey(
        FabricationProduction, 
        on_delete=models.SET_NULL, 
        blank=True, 
        null=True,
        verbose_name="Related Production ID"
    )
    related_production_type = models.CharField(
        max_length=50, 
        blank=True, 
        null=True,
        choices=[
            ('fabrication', 'Fabrication'),
            ('galvanizing', 'Galvanizing'),
            ('fab_plus_galva', 'Fab + Galva'),
            ('solar', 'Solar'),
        ]
    )
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

class Cost(models.Model):
    cost_date = models.DateField(blank=True, null=True)
    project = models.ForeignKey(Project, on_delete=models.PROTECT, blank=True, null=True)
    department = models.ForeignKey(Departement, on_delete=models.PROTECT, blank=True, null=True)
    cost_type = models.CharField(max_length=255, blank=True, null=True)
    quantity = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    unit = models.CharField(max_length=20, blank=True, null=True)
    rate = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    cost_value = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    remarks = models.TextField(blank=True, null=True)
    recorded_by = models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

class ManpowerCost(models.Model):
    SHIFT_CHOICES = [
        ('Morning', 'Morning'),
        ('Evening', 'Evening'),
        ('Night', 'Night'),
    ]
    
    ROLE_TYPE_CHOICES = [
        ('Company Staff (HO)', 'Company Staff (HO)'),
        ('Company Staff (Plant)', 'Company Staff (Plant)'),
        ('Director Office', 'Director Office'),
        ('Contract - Skilled Workmen', 'Contract - Skilled Workmen'),
        ('Security', 'Security'),
        ('Fabrication Charges', 'Fabrication Charges'),
        ('Proto Assembly', 'Proto Assembly'),
        ('Galvanizing Charges', 'Galvanizing Charges'),
        ('Gardening & Driver', 'Gardening & Driver'),
    ]
    
    date = models.DateField(blank=True, null=True)
    shift = models.CharField(max_length=25, choices=SHIFT_CHOICES, blank=True, null=True)
    department = models.ForeignKey(Departement, on_delete=models.PROTECT, blank=True, null=True)
    role = models.CharField(max_length=255, blank=True, null=True)
    role_type = models.CharField(max_length=50, choices=ROLE_TYPE_CHOICES, blank=True, null=True)
    is_contracted = models.BooleanField(blank=True, null=True)
    number_of_staff = models.IntegerField(blank=True, null=True)
    hours_worked = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    cost_per_hour = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    total_cost = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    recorded_by = models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True)
    remarks = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

class ScrapGenerationMetrics(models.Model):
    RELATED_PRODUCTION_CHOICES = [
        ('Fabrication', 'Fabrication'),
        ('Galvanizing', 'Galvanizing'),
    ]
    
    METRIC_TYPE_CHOICES = [
        ('Steel Scrap', 'Steel Scrap'),
        ('Zinc Dross', 'Zinc Dross'),
        ('Zinc Ash', 'Zinc Ash'),
    ]
    related_production_type = models.CharField(max_length=20, choices=RELATED_PRODUCTION_CHOICES, blank=True, null=True)
    reference_id = models.IntegerField(blank=True, null=True)
    metric_type = models.CharField(max_length=20, choices=METRIC_TYPE_CHOICES, blank=True, null=True)
    percentage_generated = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    actual_quantity = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    actual_value = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    remarks = models.TextField(blank=True, null=True)
    recorded_by = models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

class ProductionSummary(models.Model):
    summary_date = models.DateField(blank=True, null=True)
    total_fabrication_quantity = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    total_galvanizing_quantity = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    total_solar_quantity = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    total_scrap_sales = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    total_sales_value = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    total_fabrication_sales = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    total_galvanizing_sales = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    total_solar_sales = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    total_other_sales = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    average_sale_rate = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    recorded_by = models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

class CriticalCostParameters(models.Model):
    COST_CATEGORY_CHOICES = [
        ('Raw Material', 'Raw Material'),
        ('Zinc', 'Zinc'),
        ('LDO', 'LDO'),
        ('Electricity', 'Electricity'),
        ('Testing', 'Testing'),
    ]
    
    ASSOCIATED_PRODUCTION_CHOICES = [
        ('Fabrication', 'Fabrication'),
        ('Solar', 'Solar'),
        ('Galvanizing', 'Galvanizing'),
        ('All', 'All'),
    ]
    
    UPDATE_FREQUENCY_CHOICES = [
        ('Daily', 'Daily'),
        ('Weekly', 'Weekly'),
        ('Monthly', 'Monthly'),
        ('Annual', 'Annual'),   
        ('Variable', 'Variable'),
    ]
    
    cost_item = models.CharField(max_length=255, blank=True, null=True)
    cost_category = models.CharField(max_length=20, choices=COST_CATEGORY_CHOICES, blank=True, null=True)
    associated_production_type = models.CharField(max_length=20, choices=ASSOCIATED_PRODUCTION_CHOICES, blank=True, null=True)
    consumption_basis = models.TextField(blank=True, null=True)
    cost_per_unit = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    unit = models.CharField(max_length=20, blank=True, null=True)
    effective_date = models.DateField(blank=True, null=True)
    update_frequency = models.CharField(max_length=25, choices=UPDATE_FREQUENCY_CHOICES, blank=True, null=True)
    
    # Added fields for consumption metrics
    consumption_formula = models.TextField(blank=True, null=True)  # For formulas like "1.025xfab" or "1.01xsolar fab"
    target_consumption_rate = models.DecimalField(max_digits=10, decimal_places=4, blank=True, null=True)  # For target rates
    
    # Added fields for tracking actual consumption data
    date = models.DateField(blank=True, null=True)  # For recording the specific date of consumption
    units_consumed = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    daily_cost = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    
    # Standard tracking fields
    last_updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)
    recorded_by = models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    
    # New fields for monthly totals
    is_monthly_total = models.BooleanField(default=False)  # Flag to indicate if this record is a monthly total
    month = models.IntegerField(blank=True, null=True)
    year = models.IntegerField(blank=True, null=True)
    monthly_units_total = models.DecimalField(max_digits=15, decimal_places=2, blank=True, null=True)
    monthly_cost_total = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    

class ZincSavingMetrics(models.Model):
    summary_date = models.DateField(blank=True, null=True)
    actual_zinc_used = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    theoretical_zinc_needed = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    zinc_saved_kg = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    zinc_saved_value = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    remarks = models.TextField(blank=True, null=True)
    recorded_by = models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

class DailyCostBreakdown(models.Model):
    CATEGORY_CHOICES = [
        ('Raw Material', 'Raw Material'),
        ('Zinc', 'Zinc'),
        ('Fuel', 'Fuel'),
        ('Electricity', 'Electricity'),
        ('Testing', 'Testing'),
        ('Other', 'Other'),
    ]
    
    cost_date = models.DateField(blank=True, null=True)
    department = models.ForeignKey(Departement, on_delete=models.PROTECT, blank=True, null=True)
    cost_item = models.CharField(max_length=255, blank=True, null=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, blank=True, null=True)
    unit = models.CharField(max_length=20, blank=True, null=True)
    unit_consumed = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    cost_per_unit = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    total_cost = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    remarks = models.TextField(blank=True, null=True)
    recorded_by = models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

class ConsumablesAndWasteCosts(models.Model):
    COST_TYPE_CHOICES = [
        ('Consumable', 'Consumable'),
        ('Maintenance', 'Maintenance'),
        ('Waste Disposal', 'Waste Disposal'),
        ('Contract', 'Contract'),
        ('Utility', 'Utility'),
        ('Logistics', 'Logistics'),
        ('Other', 'Other'),
        ('Bundling', 'Bundling'),
        ('Loading', 'Loading'),
        ('Dispatch', 'Dispatch'),
        ('Inventory', 'Inventory'),
        ('Welding/Misc', 'Welding/Misc'),
        ('Water', 'Water'),
        ('Gardening', 'Gardening'),
    ]
    
    ASSOCIATED_PRODUCTION_CHOICES = [
        ('Fabrication', 'Fabrication'),
        ('Solar', 'Solar'),
        ('Galvanizing', 'Galvanizing'),
        ('General', 'General'),
    ]
    
    cost_date = models.DateField(blank=True, null=True)
    department = models.ForeignKey(Departement, on_delete=models.PROTECT, blank=True, null=True)
    cost_item = models.CharField(max_length=255, blank=True, null=True)
    cost_type = models.CharField(max_length=20, choices=COST_TYPE_CHOICES, blank=True, null=True)
    associated_production_type = models.CharField(max_length=20, choices=ASSOCIATED_PRODUCTION_CHOICES, blank=True, null=True)
    cost_per_unit = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    quantity = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    total_cost = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    recorded_by = models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True)
    remarks = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

class DispatchAndMiscCosts(models.Model):
    COST_TYPE_CHOICES = [
        ('Dispatch', 'Dispatch'),
        ('Bundling', 'Bundling'),
        ('Loading', 'Loading'),
        ('Shifting', 'Shifting'),
        ('Water', 'Water'),
        ('Misc', 'Misc'),
        ('Inventory Carrying', 'Inventory Carrying'),
        ('Hydra', 'Hydra'),
    ]
    
    cost_date = models.DateField(blank=True, null=True)
    cost_item = models.CharField(max_length=255, blank=True, null=True)
    cost_type = models.CharField(max_length=20, choices=COST_TYPE_CHOICES, blank=True, null=True)
    cost_per_unit = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    quantity = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    total_cost = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    remarks = models.TextField(blank=True, null=True)
    recorded_by = models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

class DailyFinancialSummary(models.Model):
    summary_date = models.DateField(blank=True, null=True)
    department = models.ForeignKey(Departement, on_delete=models.PROTECT, blank=True, null=True)
    total_sale_value = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    total_cost_incurred = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    zinc_saved_kg = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    total_profit_or_loss = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    zinc_saving = models.ForeignKey(ZincSavingMetrics, on_delete=models.PROTECT, blank=True, null=True)
    recorded_by = models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

class ProfitLossSummary(models.Model):
    summary_date = models.DateField(blank=True, null=True)
    total_sale_value = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    total_cost = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    zinc_saved_value = models.DecimalField(max_digits=25, decimal_places=2, blank=True, null=True)
    adjusted_cost = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    profit_or_loss = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    recorded_by = models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

class ClientTransaction(models.Model):
    PAYMENT_STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Completed', 'Completed'),
        ('Failed', 'Failed'),
        ('Partial', 'Partial'),
    ]
    
    PAYMENT_METHOD_CHOICES = [
        ('Bank Transfer', 'Bank Transfer'),
        ('Cheque', 'Cheque'),
        ('Cash', 'Cash'),
        ('Credit Card', 'Credit Card'),
        ('Other', 'Other'),
    ]
    
    client = models.ForeignKey(Client, on_delete=models.PROTECT, blank=True, null=True)
    transaction_date = models.DateField(blank=True, null=True)
    related_invoice = models.ForeignKey(Invoice, on_delete=models.PROTECT, blank=True, null=True)
    payment_amount = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES, blank=True, null=True)
    payment_status = models.CharField(max_length=25, choices=PAYMENT_STATUS_CHOICES, blank=True, null=True)
    balance_after_payment = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    remarks = models.TextField(blank=True, null=True)
    recorded_by = models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

class TransactionProgress(models.Model):
    STAGE_CHOICES = [
        ('Initiated', 'Initiated'),
        ('Processing', 'Processing'),
        ('Billed', 'Billed'),
        ('Partially Paid', 'Partially Paid'),
        ('Completed', 'Completed'),
    ]
    
    transaction = models.ForeignKey(ClientTransaction, on_delete=models.CASCADE, blank=True, null=True)
    stage = models.CharField(max_length=20, choices=STAGE_CHOICES, blank=True, null=True)
    progress_percent = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, blank=True, null=True)
    updated_by = models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

class AuditLog(models.Model):
    ACTION_CHOICES = [
        ('CREATE', 'Create'),
        ('UPDATE', 'Update'),
        ('DELETE', 'Delete'),
    ]
    
    action_type = models.CharField(max_length=25, choices=ACTION_CHOICES, blank=True, null=True)
    table_name = models.CharField(max_length=250, blank=True, null=True)
    record_id = models.IntegerField(blank=True, null=True)
    old_data = models.TextField(blank=True, null=True)
    new_data = models.TextField(blank=True, null=True)
    action_timestamp = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    performed_by = models.ForeignKey(User, on_delete=models.PROTECT, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)