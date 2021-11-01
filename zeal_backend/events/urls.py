from django.urls import path
from .views import CreateEvent
from django.contrib.auth import views as auth_views

urlpatterns = [path("create/", CreateEvent.as_view())]
