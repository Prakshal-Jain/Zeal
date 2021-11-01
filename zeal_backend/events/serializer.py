from django.db.models import fields
from rest_framework import serializers
from .models import Event


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = [
            'name', 
            'owner',
            'dateCreated', 
            'startDate', 
            'endDate',
            'email', 
            'participants',
            'code', 
            ]
        # TODO define create function in order to instance an event in a JSON serializable way
        def create(self, validated_data):
            pass