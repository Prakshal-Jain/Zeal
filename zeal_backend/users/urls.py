from django.urls import path
from .views import LoginView, LogoutView, RegisterView,UserView,ForgotPasswordAPIView
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('register', RegisterView.as_view()),
    path('login', LoginView.as_view()),
    path('user',UserView.as_view()),
    path('logout',LogoutView.as_view()),
    path('forgot',ForgotPasswordAPIView.as_view())
]