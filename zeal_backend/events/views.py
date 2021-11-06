from django.contrib.auth.models import User
from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import (
    status,
    viewsets,
    permissions,
    exceptions,
    pagination,
    filters,
)
from rest_framework.decorators import action

from events.models import EventTeamModel, OrganizerEventModel
from events.serializer import OrganizerEventSerializer

from datetime import datetime


class EventsPagination(pagination.PageNumberPagination):
    page_size = 10


class OrganizerOngoingUpcomingEventView(viewsets.ModelViewSet):

    # permission_classes = [
    #     permissions.IsAuthenticated
    # ]
    serializer_class = OrganizerEventSerializer
    pagination_class = EventsPagination
    paginate_by = 1
    search_fields = ["name"]
    lookup_field = "name"
    filter_backends = (filters.SearchFilter,)

    def get_queryset(self):
        my_date = datetime.now()
        return (
            self.request.user.events.all().filter(end__gte=my_date).order_by("-start")
        )

    def post(self, request):

        data = request.data
        all_objects = OrganizerEventModel.objects.filter(id=data["id"]).first()

        all_objects.description = data["description"]
        all_objects.website = data["website"]
        all_objects.start = data["start"]
        all_objects.end = data["end"]
        all_objects.email = data["email"]
        all_objects.phone = data["phone"]
        if data["logo"] != "null":
            all_objects.logo = data["logo"]

        all_objects.save()
        serializer = OrganizerEventSerializer(all_objects)
        return Response(serializer.data)

    # def perform_create(self, serializer):
    #     serializer.save(owner=self.request.user)

    @action(methods=["delete"], detail=True)
    def delete(self, request):
        obj = get_object_or_404(OrganizerEventModel, id=request.data["id"])
        obj.delete()
        return Response({"data": "Event deleted successfully..."})


class OrganizerPastEventView(viewsets.ModelViewSet):
    serializer_class = OrganizerEventSerializer

    def get_queryset(self):
        my_date = datetime.now()

    def get(self, request):
        print("works")



# below are participants 

class ParticipantEventJoinView(viewsets.ModelViewSet):
    # permission_classes = [
    #     permissions.IsAuthenticated
    #
    serializer_class = OrganizerEventSerializer
    queryset = OrganizerEventModel.objects.all()
    paginate_by = 1
    pagination_class = EventsPagination
    search_fields = ['name']
    lookup_field = 'name'
    filter_backends = (filters.SearchFilter,)

    def get_queryset(self):
        my_date = datetime.now()
        # Filter out user if they are already signed up on event --> exclude
        return OrganizerEventModel.objects.all().exclude(participants__in=[self.request.user]).exclude(owner=self.request.user).filter(end__gte=my_date).order_by('-start')
