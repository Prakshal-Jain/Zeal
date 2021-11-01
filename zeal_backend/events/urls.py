from django.urls import path
from .views import eventTest
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('test', eventTest.as_view())
]