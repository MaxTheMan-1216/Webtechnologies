from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    path('students/', views.students),
    path('register/', views.register),
    path('login/', views.login_form, name='login'),
    path('users/', views.list_users, name='user-list'),
    path('users/me/', views.user_detail, name='user-detail'),
    path('auth/token/', TokenObtainPairView.as_view(), name='token-obtain-pair'),
]
