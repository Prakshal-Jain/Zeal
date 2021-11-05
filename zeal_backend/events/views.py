from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets, permissions, exceptions
from events.models import EventTeamModel, OrganizerEventModel

from .serializer import OrganizerEventSerializer, EventTeamSerializer

# Create your views here.

class OrganizerEventView(APIView):

    serializer_class = OrganizerEventSerializer

    def get_queryset(self):
        return OrganizerEventModel.objects.all()

    def get(self, request):
        details = self.get_queryset()
        serializer = OrganizerEventSerializer(details, many=True)

        return Response(serializer.data)

    def post(self, request):

        serializer = OrganizerEventSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)


class EventTeamView(APIView):
    serializer_class = EventTeamSerializer

    def get_queryset(self):
        return EventTeamModel.objects.all()

    def get(self, request):
        details = self.get_queryset()
        serializer = EventTeamSerializer(details, many=True)

        return Response(serializer.data)
