from django.db import models
from users.models import User
from django.utils.crypto import get_random_string

# TODO CHANGE HOSTED BY TO A USER
# TODO add list of users attending

# Create your models here.
class Event(models.Model):
    def generateUniqueCode():
        unique = get_random_string(10)
        while(len(Event.objects.filter(code=unique).all()) > 0):
            unique = get_random_string(10)
        return unique
    
    name = models.CharField(max_length=255, unique = True)                                  
    description = models.CharField(max_length=10000, blank=True)                           
    owner = models.CharField(max_length=255, unique = True)                                
    dateCreated = models.DateTimeField(auto_now_add=True, null=True)
    startDate = models.DateTimeField(blank=False)                   
    endDate= models.DateTimeField(blank=False)
    email = models.EmailField(blank=False)
    participants = models.ManyToManyField(User)
    code = models.CharField(unique=True, max_length = 10, null=True, default=generateUniqueCode)


    
    # TODO implement later when path is clear
    #logo = models.ImageField(upload_to ='event_logos/', default='event_logos/default_event.png', blank=True, null=True)


    
