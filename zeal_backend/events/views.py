from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import 
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets, permissions, exceptions


from .serializer import EventSerializer

# Create your views here.

class CreateEvent(APIView):
    # must be host?
    permission_classes = [
        permissions.IsAuthenticated
    ]
    def post(self, request):
        serializer = EventSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    
class OranizerEventDetails(APIView):
    def get(self,request):
        


