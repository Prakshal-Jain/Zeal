from django.db import models

# TODO CHANGE HOSTED BY TO A USER
# TODO add list of users attending

# Create your models here.
class Event(models.Model):
    name = models.CharField(max_length=255)
    HostedBy = models.CharField(max_length=255, unique = True)
    # date = models.DateTimeField()
    
