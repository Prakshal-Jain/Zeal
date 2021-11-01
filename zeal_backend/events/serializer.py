from django.db.models import fields
from rest_framework import serializers
from .models import Event


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['name', 'HostedBy'
        # , 'date'
        ]

