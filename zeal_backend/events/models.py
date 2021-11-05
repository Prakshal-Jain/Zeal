from django.db import models
from users.models import User
from django.utils.crypto import get_random_string


# Create your models here.
class OrganizerEventModel(models.Model):
    def generateUniqueCode():
        unique = get_random_string(10)
        while(len(OrganizerEventModel.objects.filter(code=unique).all()) > 0):
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


    
class EventTeamModel(models.Model):
    owner = models.ForeignKey(User, related_name="team", on_delete=models.CASCADE, null=True)
    event = models.ForeignKey(OrganizerEventModel, related_name="team_related_event", on_delete=models.CASCADE, null=False)
    idea = models.CharField(max_length=10000, blank=True)
    teammates = models.ManyToManyField(User, related_name="event_teammates")
    interested = models.ManyToManyField(User, related_name="event_team_interested")
    hold_teammates = models.ManyToManyField(User, related_name="hold_teammates")
    created = models.DateTimeField(auto_now_add=True, null=True)