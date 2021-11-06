from rest_framework import serializers
from .models import OrganizerEventModel, EventTeamModel


class OrganizerEventSerializer(serializers.ModelSerializer):
    participants = serializers.SerializerMethodField("get_participants")
    class Meta:
        model = OrganizerEventModel
        fields = ('id', 'name', 'description', 'website', 'start', 'end', 'logo', 'email', 'phone', 'participants')

    def get_participants(self, obj):
        return len(obj.participants.all())

class EventParticipantSerializer(serializers.ModelSerializer):
    participants = serializers.SerializerMethodField("get_username")
    class Meta:
        model = OrganizerEventModel
        fields = ('participants',)
    
    def get_username(self, obj):
        participant_details = []
        for participants in obj.participants.all():
            participant_details.append({"id": participants.id ,"username": participants.username, "first_name": participants.first_name, "last_name": participants.last_name, "email": participants.email})
        return participant_details

class EventTeamOthersSerializer(serializers.ModelSerializer):
    interested = serializers.SerializerMethodField("get_interested_count")
    class Meta:
        model = EventTeamModel
        fields = ('id', 'idea', 'interested', 'created')

    def get_interested_count(self, obj):
        user = self.context['request'].user
        count = len(obj.interested.all())
        return {"interest_count": count, "is_interested": user in obj.interested.all()}

class EventTeamOwnerSerializer(serializers.ModelSerializer):
    interested = serializers.SerializerMethodField("get_interested")
    teammates = serializers.SerializerMethodField("get_teammates")
    hold_teammates = serializers.SerializerMethodField("get_hold_teammates")
    class Meta:
        model = EventTeamModel
        fields = ('id', 'idea', 'teammates', 'interested', 'hold_teammates', 'created')
    
    def get_teammates(self, obj):
        user_details = []
        for people in obj.teammates.all():
            user_details.append({"username": people.username, "first_name": people.first_name, "last_name": people.last_name, "email": people.email})
        return user_details

    def get_interested(self, obj):
        user_details = []
        for people in obj.interested.all():
            if((people not in obj.teammates.all()) and (people not in obj.hold_teammates.all())):
                user_details.append({"username": people.username, "first_name": people.first_name, "last_name": people.last_name, "email": people.email})
        return user_details

    def get_hold_teammates(self, obj):
        user_details = []
        for people in obj.hold_teammates.all():
            user_details.append({"username": people.username, "first_name": people.first_name, "last_name": people.last_name, "email": people.email})
        return user_details

class EventOrganizerTeamSerializer(serializers.ModelSerializer):
    teammates = serializers.SerializerMethodField("get_teammates")
    owner = serializers.SerializerMethodField("get_owner")
    class Meta:
        model = EventTeamModel
        fields = ('id', 'idea', 'teammates', 'owner', 'created')
    
    def get_owner(self, obj):
        owner = obj.owner
        return {"username": owner.username, "first_name": owner.first_name, "last_name": owner.last_name, "email": owner.email}

    def get_teammates(self, obj):
        user_details = []
        for people in obj.teammates.all():
            user_details.append({"username": people.username, "first_name": people.first_name, "last_name": people.last_name, "email": people.email})
        return user_details