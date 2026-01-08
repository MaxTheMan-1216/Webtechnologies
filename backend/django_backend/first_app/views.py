from decimal import Decimal
from django.shortcuts import render, redirect
from .forms import UserRegistrationForm, UserLoginForm
from .models import Student
import json
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import permissions
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication

from .serializers import UserSerializer
from .models import Item
from .serializers import ItemSerializer
from django.views.decorators.csrf import csrf_protect


def students(request):
    students = [
        {'first_name': 'John', 'last_name': 'Doe', 'email': 'john.doe@example.com'},
        {'first_name': 'Jane', 'last_name': 'Smith', 'email': 'jane.smith@example.com'},
    ]
    return render(request, 'student_template.html', context={'students': students})


def register(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = UserRegistrationForm()
        return render(request, 'register.html', context={'form': form})
    

def login_form(request):
    if request.method == 'POST':
        form = UserLoginForm(request.POST)

        user = authenticate(
            username=form.data.get('username'),
            password=form.data.get('password')
        )
        if form.is_valid():
            return HttpResponse("Login Successful")
    form = UserLoginForm()
    return render(request, 'login.html', context={'form': form})


@csrf_exempt
def student_save(request):
    if request.method == 'POST':
        body = request.body
        json_data = json.loads(body)
        
        first_name = json_data.get('first_name')
        last_name = json_data.get('last_name')
        email = json_data.get('email')

        student = Student(first_name=first_name, last_name=last_name, email=email)
        student.save()
        return HttpResponse("Student saved successfully")
    else:
        raise ValueError("Invalid request method")

@api_view(['GET'])
def list_users(request):
    """
    Basic paginated endpoint that returns a few users at a time.
    DRF's PageNumberPagination keeps the logic short and readable.
    """

    paginator = PageNumberPagination()
    paginator.page_size = 1
    users = User.objects.order_by('id')
    page = paginator.paginate_queryset(users, request)
    serializer = UserSerializer(page, many=True)
    response = paginator.get_paginated_response(serializer.data)
    response.data['page'] = paginator.page.number
    response.data['page_size'] = paginator.get_page_size(request)
    return response

@api_view(['GET', 'POST'])
def items_view(request):
    if request.method == 'GET':
        items = Item.objects.filter(status=Item.Status.ON_SALE)
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        if not request.user.is_authenticated:
            return Response(
                {"detail": "Authentication required"},
                status=401
            )
        
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(seller=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([permissions.IsAuthenticated])
def user_detail(request):
    """
    Super small view: it simply returns data for the user whose token is provided.
    """

    serializer = UserSerializer(request.user)
    return Response(serializer.data)

@api_view(['DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([permissions.IsAuthenticated])
def delete_item(request, item_id):
    try:
        item = Item.objects.get(id=item_id)
    except Item.DoesNotExist:
        return Response({"detail": "Not Found"}, status=404)
    
    if item.seller != request.user:
        return Response (
            {"detail": "Not Allowed"},
            status=403
        )
    
    item.delete()
    return Response(status=204)

@csrf_protect
def populate_db(request):
    if request.method == 'POST':
        Item.objects.all().delete()
        User.objects.exclude(is_superuser=True).delete()

        users = []

        for i in range(1, 7):
            user = User.objects.create_user(
                username=f'testuser{i}',
                password='pass{i}',
                email=f"testuser{i}@shop.aa"
            )
            users.append(user)

        for seller in users[:3]:
            for j in range (1, 11):
                Item.objects.create(
                    name=f"Item {j} by {seller.username}",
                    description="Automatically generated item.",
                    price=Decimal("10.0") * j,
                    status=Item.Status.ON_SALE,
                    seller=seller
                )
        
        return render(
            request,
            "landing.html",
            {"message": "Database populated successfully!"}
        )
    
    return render(request, "landing.html")