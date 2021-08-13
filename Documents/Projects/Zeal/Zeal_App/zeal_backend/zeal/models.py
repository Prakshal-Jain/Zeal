from django.db import models

# Create your models here.
class UserData(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField(max_length=150)
    profile = models.JSONField(default={})
    def _str_(self):
        return self.name