from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views
from .views import populate_db
urlpatterns = [
    path('users/', views.list_users),
    path('users/me/', views.user_detail),
    path('auth/token/', TokenObtainPairView.as_view()),
    
    path('items/', views.items_view, name='items'),
    path('items/<int:item_id>/', views.delete_item, name='item.delete'),
    path('', populate_db, name='landing'),
    path('populate/', populate_db, name='populate_db'),
]
