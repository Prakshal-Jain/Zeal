from django.contrib import admin
from .models import UserData

# Register your models here.
class zealAdmin(admin.ModelAdmin):
    fields = ('name', 'email', 'profile')

admin.site.register(UserData, zealAdmin)