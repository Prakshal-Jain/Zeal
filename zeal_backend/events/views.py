from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
# Create your views here.

def eventTest(request):
    return HttpResponse('event test')