from django.db import models
from django.utils import timezone

# Create your models here.
class AutoDateTimeField(models.DateTimeField):
    def pre_save(self, model_instance, add):
        return timezone.now()

class TallyData(models.Model):
    tally_guid       = models.CharField(max_length=100, null=True, blank=True, unique=True)
    tally_json_data  = models.JSONField()
    created_at       = AutoDateTimeField(auto_created=True,default=timezone.now)
    updated_at       = AutoDateTimeField(default=timezone.now) 
    
    class Meta:
        db_table = 'tally_data'

