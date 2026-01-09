from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Item
from .models import CartItem

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_joined']

class ItemSerializer(serializers.ModelSerializer):
    seller = serializers.ReadOnlyField(source='seller.username')
    image = serializers.ImageField(use_url=True, required=False)

    class Meta:
        model = Item
        fields = "__all__"
        
class CartItemSerializer(serializers.ModelSerializer):
    item = ItemSerializer()

    class Meta:
        model = CartItem
        fields = ['id', 'item','added_at']