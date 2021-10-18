from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # not sure if profile pic should be in fields
        fields = ['id', 'name', 'email', 'password', 'username', 'profile_pic']

        # write extra properties for fields here
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        # don't return password on post requests
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class ImageSerializer(serializers.Serializer):
    image = serializers.ImageField()