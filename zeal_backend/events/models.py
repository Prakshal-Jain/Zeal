from django.db import models

# Create your models here.
class Event(models.Model):
    name = models.CharField(max_length=255)
    HostedBy = models.CharField(max_length=255, unique = True)
    date = models.DateTimeField()
    
