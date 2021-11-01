from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import exceptions
from rest_framework.views import APIView
from rest_framework.response import Response


from .serializer import EventSerializer
# Create your views here.

class EventView(APIView):
   def post(self, request):
      serializer = EventSerializer(data = request.data)
      serializer.is_valid(raise_exception=True)
      serializer.save()
      return Response(serializer.data) 

