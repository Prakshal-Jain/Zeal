from django.contrib.auth.models import User
from django.shortcuts import render
from django.http import HttpResponse

from django.http.response import HttpResponse
from .models import OrganizerEventModel, EventTeamModel
from rest_framework import status, viewsets, permissions
from events.serializers import (
    OrganizerEventSerializer,
    EventParticipantSerializer,
    EventTeamOthersSerializer,
    EventTeamOwnerSerializer,
    EventOrganizerTeamSerializer,
)
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import pagination
from rest_framework import filters
from datetime import datetime
from django.shortcuts import get_object_or_404


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

    def put(self, request):

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

    def post(self, request, *args, **kwargs):
        print(str(request.data) + "REQUEST")
        data = request.data
        email = data["email"]
        user = User.objects.filter(email=email).first()
        user = request.user
        print(str(user))
        if request.user is not None:
            print("ID" + str(request.user))
        else:
            print("NONE")

        # if user is None:
        #   raise AuthenticationFailed('user not found!')
        serializer = OrganizerEventSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(owner=user)
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
    search_fields = ["name"]
    lookup_field = "name"
    filter_backends = (filters.SearchFilter,)

    def get_queryset(self):
        my_date = datetime.now()
        # Filter out user if they are already signed up on event --> exclude
        # allobjects =
        data = self.request.data
        user = User.objects.filter(email=data["email"]).first()
        return (
            OrganizerEventModel.objects.all()
            .exclude(participants__in=[user])
            .exclude(owner=user)
            .filter(end__gte=my_date)
            .order_by("-start")
        )
