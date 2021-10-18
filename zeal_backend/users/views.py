from typing import ByteString
from django.http import response
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
from .models import User
from rest_framework.exceptions import AuthenticationFailed
import jwt,datetime
import json
from .forms import ImageForm

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
            'exp':datetime.datetime.utcnow() +datetime.timedelta(minutes = 60),
            'iat':datetime.datetime.utcnow()
        }
        #TODO: find place for 'secret' key 
        token = jwt.encode(payload,'secret',algorithm='HS256')


        response = Response()
        #set the token to a cookie
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

class UploadImage(APIView):
    def post(self, request):
        form = ImageForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            img_obj = form.instance
            return render(request, 'index.html', {'form': form, 'img_obj': img_obj})
        else:
            form = ImageForm()
            return render(request, 'index.html', {'form': form})

