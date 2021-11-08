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
from users.models import User
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import pagination
from rest_framework import filters
from datetime import datetime
from django.shortcuts import get_object_or_404
import jwt


class EventsPagination(pagination.PageNumberPagination):
    page_size = 10


class OrganizerOngoingUpcomingEventView(viewsets.ModelViewSet):

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
        token = request.COOKIES.get("jwt")
        payload = jwt.decode(token, "secret", algorithms=["HS256"])
        user = User.objects.get(id=payload["id"])

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

    def put(self, request):
        my_date = datetime.now()
        data = request.data
        token = request.COOKIES.get("jwt")
        payload = jwt.decode(token, "secret", algorithms=["HS256"])
        user = User.objects.get(id=payload["id"])
        eventID = data["id"]

        eventToChange = OrganizerEventModel.objects.filter(id=eventID).first()
        all = eventToChange.participants.all()
        if user in all:
            r = Response("You've already joined this event")
            r.status_code = 404
            return r

        eventToChange.participants.add(user)

        return Response("Event Joined")


class OrganizerParticipantsListView(viewsets.ModelViewSet):
    serializer_class = OrganizerEventSerializer

    def get_queryset(self):
        token = self.request.COOKIES.get("jwt")
        payload = jwt.decode(token, "secret", algorithms=["HS256"])
        user = User.objects.get(id=payload["id"])
        # event_id = self.request.query_params.get("event_id")
        data = self.request.data
        id = self.request.query_params.get("event_id")
        
        event = OrganizerEventModel.objects.filter(id=id)
        return event

class ParticipantEventLeaveView(viewsets.ModelViewSet):

    serializer_class = OrganizerEventSerializer
    queryset = OrganizerEventModel.objects.all()
    paginate_by = 1
    pagination_class = EventsPagination
    search_fields = ["name"]
    lookup_field = "name"
    filter_backends = (filters.SearchFilter,)

    def put(self, request):
        my_date = datetime.now()
        data = request.data
        token = request.COOKIES.get("jwt")
        payload = jwt.decode(token, "secret", algorithms=["HS256"])
        user = User.objects.get(id=payload["id"])
        eventID = data["id"]
        print(eventID)
        eventToChange = OrganizerEventModel.objects.filter(id=eventID).first()
        all = eventToChange.participants.all()
        if user not in all:
            r = Response("You've already left this event")
            r.status_code = 404
            return r

        eventToChange.participants.remove(user)

        return Response("Left Event")
