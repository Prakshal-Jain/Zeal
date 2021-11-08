from typing import ByteString
from django.core.mail import send_mail
from django.core.checks import messages
from django.http import response
from django.shortcuts import render
from rest_framework import exceptions
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
from .models import User,PasswordReset
from rest_framework.exceptions import AuthenticationFailed
import jwt,datetime,random,string
import os
import json

# Create your views here.
class RegisterView(APIView):
    def post(self,request):
       serializer = UserSerializer(data = request.data)
       serializer.is_valid(raise_exception=True)
       serializer.save()
       return Response(serializer.data)

class LoginView(APIView):
    def post(self , request):
        #get email and password
        email = request.data['email']
        password = request.data['password']

        #find user by email
        user = User.objects.filter(email = email).first()

        #raise exception if user not found
        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')

        #payload for JWT
        #id:user id
        #exp:how long you want the token to last(in this case it will last 60 minutes)
        #iat:when token was created
        payload = {
            'id':user.id,
            'exp':datetime.datetime.utcnow() + datetime.timedelta(minutes = 60),
            'iat':datetime.datetime.utcnow()
        }
       # #TODO: find place for 'secret' key
        token = jwt.encode(payload,'secret',algorithm='HS256')


        response = Response()
       # #set the token to a cookie
        response.set_cookie(key = 'jwt',value = token, httponly = True)
        response.data = {
            "jwt":token
        }

        return response

class UserView(APIView):
    def get(self, request):
        #get cookie
        token = request.COOKIES.get('jwt')

        #if cookie not found
        if not token:
            raise AuthenticationFailed('Unauthenticated')

        try:
            payload = jwt.decode(token,'secret',algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')
        #instantiate user object
        user = User.objects.filter(id = payload['id']).first()
        #user object not json serializable so need serializer
        serializer = UserSerializer(user)

        return Response(serializer.data)

class LogoutView(APIView):
    def post(self , request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message':'cookie removed succesfully'
        }
        return response

class ForgotPasswordAPIView(APIView):

    def post(self,request):
        #request contains email
        username = request.data['username']


        
        user = User.objects.filter(username = username).first()
        #raise exception if user not found
        if user is None:
            raise AuthenticationFailed('User not found!')
        email = user.email
        


        #generate token(did this manually)
        token = ''.join(random.choice(string.ascii_uppercase)+string.digits for _ in range(12))
        PasswordReset.objects.create(email = email,token = token)


        #send email with token
        send_mail(
            subject = "Reset your Zeal password!",
            message = 'Click this link <a href="http://localhost:3000/reset/?token='+ token + '">here</a> to reset your password!',
            from_email = os.getenv('EMAIL_HOST_USER'),
            recipient_list = [email]
        )



        return Response(
            {
                'response':"Please check your email!"
            }
        )

class ResetPasswordAPIView(APIView):
    def post(self, request):
        data = request.data



        password_reset = PasswordReset.objects.filter(token = data['token']).first()
        user = User.objects.filter(email = password_reset.email).first()

        if not user:
            raise exceptions.NotFound('user not found!')

        user.set_password(data['password'])
        user.save()


        return Response(
            {
                'message':'Password sucessfully reset'
            }
        )
