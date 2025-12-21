from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Item


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_joined']

class ItemSerializer(serializers.ModelSerializer):
    seller = serializers.CharField(source='seller.username')
    image = serializers.ImageField(use_url=True)

    class Meta:
        model = Item
        fields = "__all__"
        