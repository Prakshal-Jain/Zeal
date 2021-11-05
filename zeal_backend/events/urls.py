from django.urls import path
from .views import OrganizerEventView, EventTeamView
from django.contrib.auth import views as auth_views

urlpatterns = [
    path("create/", OrganizerEventView.as_view()),
    path("view/", EventTeamView.as_view()),
]
