from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets, permissions, exceptions


from zeal_backend.events import serializer
from .serializer import OrganizerEventSerializer, EventTeamSerializer

# Create your views here.

class OrganizerEventView(APIView):
    # must be host?

    def post(self, request):
        serializer = OrganizerEventSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    
class EventTeamView(APIView):
    
    def post(self, request):
            serializer = EventTeamSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)


