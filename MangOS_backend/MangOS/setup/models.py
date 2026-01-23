from django.db import models
from django.utils import timezone
import qrcode
from io import BytesIO
from django.core.files import File
from PIL import Image, ImageDraw, ImageFont

# Create your models here.

class MachineType(models.TextChoices):
    ELECTRICAL = "Electrical Machine"
    MECHANICAL = "Mechanical Machine"
    PRODUCTION = "Production Machine"

class AMCType(models.TextChoices):
    COMPREHENSIVE = "Comprehensive"
    NON_COMPREHENSIVE = "Non-Comprehensive"
    NON_AMC = "Non-AMC"

class MaterialType(models.TextChoices):
    PLATE   = "Plate","plate"
    SECTION = "Section","section"

class Employee(models.Model):
    EMPLOYMENT_TYPES = [
        ('full_time', 'Full-Time'),
        ('part_time', 'Part-Time'),
        ('contract', 'Contract'),
        ('intern', 'Intern'),
    ]

    GENDER_CHOICES = [
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
    ]

    employee_id              = models.CharField(max_length=20)
    first_name               = models.CharField(max_length=50)
    last_name                = models.CharField(max_length=50)
    email                    = models.EmailField(unique=True)
    phone_number             = models.CharField(max_length=15, blank=True, null=True)
    date_of_birth            = models.DateField(blank=True, null=True)
    gender                   = models.CharField(max_length=10, choices=GENDER_CHOICES, blank=True, null=True)
    address                  = models.TextField(blank=True, null=True)
    employment_type          = models.CharField(max_length=10, choices=EMPLOYMENT_TYPES)
    department               = models.CharField(max_length=100)
    designation              = models.CharField(max_length=100)
    date_of_joining          = models.DateField(null=True, blank=True)
    is_active                = models.BooleanField(default=True)
    user_name                = models.CharField(max_length=100)
    password                 = models.CharField(max_length=100)
    created_at               = models.DateTimeField(default=timezone.now)
    updated_at               = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'employee'


class ClientDetails(models.Model):
    client_name              = models.CharField(max_length=255)  
    email                    = models.EmailField(unique=True)  
    phone_number             = models.CharField(max_length=15, blank=True, null=True)  
    address                  = models.TextField(blank=True, null=True) 
    project_name             = models.CharField(max_length=255)  
    start_date               = models.DateField(blank=True, null=True)  
    end_date                 = models.DateField(blank=True, null=True) 
    created_at               = models.DateTimeField(default=timezone.now)  
    updated_at               = models.DateTimeField(auto_now=True)  

    class Meta:
        db_table = 'client_details'


class InventoryCategory(models.Model):
    name                     = models.CharField(max_length=100, unique=True)
    description              = models.TextField(blank=True, null=True)
    created_at               = models.DateTimeField(default=timezone.now)  
    updated_at               = models.DateTimeField(auto_now=True) 

    class Meta:
        db_table = 'inventory_category'


class ItemMaster(models.Model):
    
    name                     = models.CharField(max_length=255)
    item_type                = models.CharField(max_length=255)
    item_descr               = models.TextField(blank=True, null= True)
    product_no               = models.IntegerField(blank=True, null= True)
    quantity                 = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    thickness                = models.IntegerField(blank=True, null= True)
    length                   = models.IntegerField(blank=True, null= True)
    height                   = models.IntegerField(blank=True, null= True)
    breadth                  = models.IntegerField(blank=True, null= True)
    material_type            = models.CharField(max_length=255,choices=MaterialType.choices,blank=True,null=True)
    unit_of_measure          = models.CharField(max_length=255,blank=True, null= True)
    created_at               = models.DateTimeField(default=timezone.now)  
    updated_at               = models.DateTimeField(auto_now=True) 

    class Meta:
        db_table = 'item_master'


class InventoryItem(models.Model):
    item_id                  = models.ForeignKey(ItemMaster, on_delete=models.CASCADE, related_name="inventory_items", null= True)
    category                 = models.ForeignKey(InventoryCategory, on_delete=models.CASCADE, related_name="inventory_items")
    item_name                = models.CharField(max_length=150)
    item_code                = models.CharField(max_length=50, unique=True)
    quantity_available_kg    = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    quantity_available_pc    = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    last_updated             = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'inventory_items'


class MachineMaster(models.Model):
    machine_name             = models.CharField(max_length=255)
    machine_type             = models.CharField(max_length=50, choices=MachineType.choices)
    amc_type                 = models.CharField(max_length=20, choices=AMCType.choices)
    vendor                   = models.CharField(max_length=255, blank=True, null=True, help_text="Applicable only for AMC types")
    created_at               = models.DateTimeField(default=timezone.now)  
    updated_at               = models.DateTimeField(auto_now=True) 

    class Meta:
        db_table = 'machine_master'  


class MaintenanceRecord(models.Model):
    machine                  = models.ForeignKey(MachineMaster, on_delete=models.CASCADE, related_name="maintenance_records")
    description              = models.TextField(blank=True, null= True)
    created_at               = models.DateTimeField(default=timezone.now)  
    updated_at               = models.DateTimeField(auto_now=True) 

    class Meta:
        db_table = 'maintenance_record'


class MachineMaterial(models.Model):
    machine                  = models.ForeignKey(MachineMaster, on_delete=models.CASCADE, related_name="machine_material")
    material_name            = models.CharField(max_length=255)
    created_at               = models.DateTimeField(default=timezone.now)  
    updated_at               = models.DateTimeField(auto_now=True) 

    class Meta:
        db_table = 'machine_material'


class BOMSheet(models.Model):
    name                     = models.CharField(max_length=255)  
    bom_file                 = models.FileField(upload_to='bom_sheet/')  
    uploaded_at              = models.DateTimeField(auto_now_add=True) 
    jc_produced              = models.BooleanField(default=False , blank=True, null=True)
    last_processed_at        = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'bom_sheets'
        
        
    

    

    def update_production_status(self):
        """Update jc_produced status based on job cards"""
        from .models import JobCard
        total_sections = self.get_bom_section_count()  # Implement this method
        processed_sections = JobCard.objects.filter(bom_sheet=self).count()
        self.jc_produced = (processed_sections >= total_sections)
        self.last_processed_at = timezone.now()
        self.save()
    





class Project(models.Model):
    name                     = models.CharField(max_length=255)
    client                   = models.ForeignKey(ClientDetails, on_delete=models.CASCADE, related_name="projects",blank=True,null=True)
    inventory_items          = models.ManyToManyField(InventoryItem,through='ProjectInventory',related_name='projects')  
    consignment_id           = models.CharField(max_length=100, unique=True)  
    workflow                 = models.ForeignKey('Workflow', on_delete=models.SET_NULL, null=True, blank=True, related_name="projects")  
    start_date               = models.DateField(null=True, blank=True)  
    end_date                 = models.DateField(null=True, blank=True)  
    description              = models.TextField(blank=True, null=True)  
    created_at               = models.DateTimeField(default=timezone.now)
    bom_sheet                = models.ForeignKey('BOMSheet', on_delete=models.SET_NULL, null=True, blank=True, related_name='projects')
    employee                 = models.ForeignKey('Employee', on_delete=models.SET_NULL, null=True, blank=True, related_name='projects')
    machine                  = models.ForeignKey('MachineMaster', on_delete=models.SET_NULL, null=True, blank=True, related_name='projects')

    class Meta:
        db_table = 'project'
        
        
        
class JobCard(models.Model):
    # Header Information
    bom_sheet = models.ForeignKey(BOMSheet, on_delete=models.CASCADE, related_name="job_cards")
    project = models.ForeignKey(Project, on_delete=models.CASCADE, null=True, blank=True)
    company_name = models.CharField(max_length=255, default="ERA T & D Ltd")
    Job_order_no = models.CharField(max_length=100)
    type_of_tower = models.CharField(max_length=100)
    note = models.TextField(default="Please fabricate the following Mark Nos. against with Mass Production.")
    created_at = models.DateTimeField(auto_now_add=True)
    
    # Section A - Main Job Details
    mark_no = models.CharField(max_length=100)
    section = models.CharField(max_length=100)
    length = models.CharField(max_length=50)
    width = models.CharField(max_length=50)
    unit = models.CharField(max_length=50)
    wt_and_pcs = models.CharField(max_length=50)
    total_quantity = models.CharField(max_length=50)
    total_weight = models.CharField(max_length=50)
    operations = models.CharField(max_length=100, blank=True, null=True)
    remarks = models.TextField(blank=True)
    
    # Section B - Allocation Details
    allocated_1 = models.CharField(max_length=50, blank=True, null=True)  # Typically the job length
    count = models.CharField(max_length=50, blank=True, null=True)       # Pieces per inventory item
    consumed_length = models.CharField(max_length=50, blank=True, null=True)  # Total length consumed
    inventory_length = models.CharField(max_length=50, blank=True, null=True)  # Length from inventory
    cutting_loss = models.CharField(max_length=50, blank=True, null=True)      # Cutting loss amount
    serial_number = models.CharField(max_length=100, blank=True, null=True)    # Inventory serial number
    available_length = models.CharField(max_length=50, blank=True, null=True)  # Available inventory length
    pieces = models.CharField(max_length=50, blank=True, null=True)            # Pieces needed
    
    # Section C - Embossing and Additional Information 
    embossing = models.CharField(max_length=100, blank=True, null=True)
    sin_no = models.CharField(max_length=100, blank=True, null=True)
    release_date = models.DateField(blank=True, null=True)
    jc_no = models.CharField(max_length=100, blank=True, null=True)
    pcs = models.CharField(max_length=100,blank=True, null=True)  # Number of pieces per line item
    unit_weight = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)  # Unit wt
    weight_in_kgs = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)  # wt in kgs (for allocated pieces)
    
    # Project Information (from BOM)
    product_code = models.CharField(max_length=100, blank=True, null=True)
    tower_type = models.CharField(max_length=100, blank=True, null=True)
    client_name = models.CharField(max_length=255, blank=True, null=True)
    
    def __str__(self):
        return f"{self.Job_order_no} - {self.mark_no}"
        
        

class JobCardReport(models.Model):
    job_card = models.ForeignKey(JobCard, on_delete=models.CASCADE, related_name='reports')
    
    # Weight Information
    planning_weight = models.FloatField(blank=True, null=True)
    raw_material_weight = models.FloatField(blank=True, null=True)
    srn_weight = models.FloatField(blank=True, null=True)
    wastage_percent = models.FloatField(blank=True, null=True)
    wastage_weight = models.FloatField(blank=True, null=True)
    
    # Calculated Fields
    calculated_weight = models.FloatField(blank=True, null=True)  # From Wt/Piece × Quantity
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Report for {self.job_card}"        
        
        
        
        
class ProjectInventory(models.Model):
    project                  = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="project_inventories")
    inventory_item           = models.ForeignKey(InventoryItem, on_delete=models.CASCADE, related_name="project_inventories")
    quantity_used_kg         = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    quantity_used_pc         = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    remarks                  = models.TextField(blank=True, null=True)
    added_at                 = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'project_inventory'
        unique_together = ('project', 'inventory_item')



class Files(models.Model):
    project                  = models.ForeignKey('Project', on_delete=models.CASCADE, related_name="files") 
    uploaded_by              = models.ForeignKey('ClientDetails', on_delete=models.CASCADE, related_name="uploaded_files",null=True,blank=True) 
    file_name                = models.CharField(max_length=255)  
    file_path                = models.FileField(upload_to='uploads/') 
    uploaded_at              = models.DateTimeField(default=timezone.now) 

    class Meta:
        db_table = 'files'


class Step(models.Model):
    name                     = models.CharField(max_length=255,blank=True, null= True)
    process_type             = models.CharField(max_length=255,blank=True, null= True)
    step_descr               = models.TextField(blank=True, null= True)
    order                    = models.PositiveIntegerField(blank=True, null= True)  
    created_at               = models.DateTimeField(auto_now_add=True)
    updated_at               = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'step'


class Workflow(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("in_progress", "In Progress"),
        ("completed", "Completed"),
    ]

    name = models.CharField(max_length=255, unique=True)
    description = models.TextField(blank=True, null=True)

    step_1 = models.ForeignKey("Step", on_delete=models.CASCADE, related_name="workflow_step1",blank=True, null= True)
    step_2 = models.ForeignKey("Step", on_delete=models.CASCADE, related_name="workflow_step2",blank=True, null= True)
    step_3 = models.ForeignKey("Step", on_delete=models.CASCADE, related_name="workflow_step3",blank=True, null= True)
    step_4 = models.ForeignKey("Step", on_delete=models.CASCADE, related_name="workflow_step4",blank=True, null= True)
    step_5 = models.ForeignKey("Step", on_delete=models.CASCADE, related_name="workflow_step5",blank=True, null= True)


    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'workflow'



class StockDetails(models.Model):
    inventory               = models.ForeignKey(InventoryItem, on_delete=models.CASCADE, related_name="stock_details")
    project                 = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="stock_details")
    quantity_available_kg   = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    quantity_available_pc   = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    length                  = models.IntegerField(blank=True, null= True)
    breadth                 = models.IntegerField(blank=True, null= True)
    material_type           = models.CharField(max_length=255,blank=True, null= True)


    class Meta:
        db_table = 'stockdetails'

class StockMovement(models.Model):
    MOVEMENT_CHOICES = [
        ("in", "IN"),
        ("between", "BETWEEN"),
        ("out", "OUT"),
    ]

    item                    = models.ForeignKey(ItemMaster, on_delete=models.CASCADE, related_name="stock_movement_as_item", null= True)
    project                 = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="stock_movement")  # current project
    previous_project        = models.ForeignKey(Project, on_delete=models.SET_NULL, blank=True, null=True, related_name="stock_movement_from") 
    name                    = models.CharField(blank=True, null=True)
    reciept_no              = models.IntegerField(blank=True, null= True)
    movement_type           = models.CharField(choices=MOVEMENT_CHOICES, max_length=20)
    supplier                = models.CharField(blank=True, null=True)
    warehouse               = models.CharField(blank=True, null=True)
    length                  = models.IntegerField(blank=True, null= True)
    height                  = models.IntegerField(blank=True, null= True)
    breadth                 = models.IntegerField(blank=True, null= True)
    thickness               = models.IntegerField(blank=True, null= True)
    material_type           = models.CharField(max_length=255,choices=MaterialType.choices,blank=True,null=True)
    quantity_available_kg   = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    quantity_available_pc   = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    created_at              = models.DateTimeField(default=timezone.now)

    class Meta:
        db_table = 'stock_movement'
        
        
class MachineQRCode(models.Model):
    machine                  = models.OneToOneField(MachineMaster, on_delete=models.CASCADE, related_name='qr')
    qr_code                  = models.ImageField(upload_to='qr_codes/', blank=True)

    def save(self, *args, **kwargs):
        # Generate QR code with machine ID
        qr = qrcode.QRCode(box_size=10, border=4)
        qr_data = f"http://43.204.203.153:8000/qr-code/get-job-card-by-qr/?{self.machine.id}"
        qr.add_data(qr_data)
        qr.make(fit=True)
        qr_img = qr.make_image(fill="black", back_color="white").convert("RGB")
    
        # Set up text
        text = f"Machine: {self.machine.machine_name}"
        font = ImageFont.load_default()
        bbox = font.getbbox(text)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
    
        # Create new image with extra height for text
        total_height = qr_img.size[1] + text_height + 10
        result = Image.new("RGB", (qr_img.size[0], total_height), "white")
    
        # Paste QR and draw text
        result.paste(qr_img, (0, 0))
        draw = ImageDraw.Draw(result)
        text_x = (qr_img.size[0] - text_width) // 2
        text_y = qr_img.size[1] + 5
        draw.text((text_x, text_y), text, font=font, fill="black")
    
        # Save to buffer
        buffer = BytesIO()
        result.save(buffer, format="PNG")
        self.qr_code.save(f"{self.machine.id}_qr.png", File(buffer), save=False)
    
        super().save(*args, **kwargs)
        
        
        
class TallyData(models.Model):

    tally_guid              = models.CharField(max_length=100, unique=True)
    tally_json_data         = models.JSONField()
    created_at              = models.DateTimeField(default=timezone.now)
    updated_at              = models.DateTimeField(default=timezone.now)   
    
    
    class Meta:
        db_table = 'tally_data'
        
        

class Sales(models.Model):
    type = models.CharField(max_length=255)
    date = models.DateField()
    rate = models.DecimalField(max_digits=10, decimal_places=3)
    quantity = models.DecimalField(max_digits=10, decimal_places=3)
    unit = models.CharField(max_length=255)
    rate_unit = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'sales'


class Cost(models.Model):
    type = models.CharField(max_length=255)
    date = models.DateField()
    rate = models.DecimalField(max_digits=10, decimal_places=3)
    quantity = models.DecimalField(max_digits=10, decimal_places=3)
    rate_unit = models.CharField(max_length=255)
    unit = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)   
    
    
    class Meta:
        db_table = 'cost'        
    
    
        
