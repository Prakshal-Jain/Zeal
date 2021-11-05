from django.db.models import fields
from rest_framework import serializers
from .models import OrganizerEventModel, EventTeamModel


class OrganizerEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrganizerEventModel
        # TODO resolve
        # changed fields to be a list, not sure why it was changed to a tuple
        # also added more fields to match the ones in the OrganizerEventModel 
        # shouldn't get_participants be in views?

        fields = ['id', 'name', 'description', 'website', 'startDate', 'endDate', 'owner','logo','email', 'phone', 'created','participants']


       
        # def get_participants(self, obj):
        #     return len(obj.participants.all())
        
        def create(self, validated_data):
            return OrganizerEventModel.objects.create(**validated_data)

class EventTeamSerializer(serializers.ModelSerializer):
    class Meta: 
        model = EventTeamModel
        # TODO RESOLVE
        # not sure if it needs an id
        fields = ['id','owner', 'event', 'idea', 'teammates', 'interested', 'hold_teammates', 'created']
        def create(self, validated_data):
            return EventTeamModel.objects.create(**validated_data)


