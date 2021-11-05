from django.db.models import fields
from rest_framework import serializers
from .models import Event


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ('id', 'name', 'description', 'website', 'startDate', 'endDate', 'email', 'phone', 'participants')
        # TODO define create function in order to instance an event in a JSON serializable way
        def get_participants(self, obj):
            return len(obj.participants.all())