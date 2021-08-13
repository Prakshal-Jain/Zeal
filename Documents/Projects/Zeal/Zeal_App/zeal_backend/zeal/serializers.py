from rest_framework import serializers
from .models import UserData

class UserDataSerializers(serializers.ModelSerializer):
    class Meta:
        model = UserData
        fields = ('name', 'email', 'profile')