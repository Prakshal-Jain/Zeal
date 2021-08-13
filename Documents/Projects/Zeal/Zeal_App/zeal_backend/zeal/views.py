from django.shortcuts import render
from rest_framework import viewsets
from .serializers import UserDataSerializers
from .models import UserData

# Create your views here.
class UserDataView(viewsets.ModelViewSet):
    serializer_class = UserDataSerializers
    queryset = UserData.objects.all()