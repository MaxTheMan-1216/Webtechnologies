from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Student(models.Model):
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.CharField(unique=True)
    enrollment_date = models.DateField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.first_name} {self.id}"
    
    def full_name(self):
        return f"{self.first_name} {self.last_name}"
    
    def email_lastname(self):
        return f"{self.email} {self.last_name}"
    
    def clean(self):
        self.first_name = self.first_name.strip()
        self.last_name = self.last_name.strip()
        self.email = self.email.strip().lower()

    def save(self, *args, **kwargs):
        self.full_clean()
        
        super().save(*args, **kwargs)

class Item(models.Model):
    image = models.ImageField(upload_to="items/", blank=True, null=True)
    class Status(models.TextChoices):
        ON_SALE = 'ON_SALE', 'on sale'
        SOLD = 'SOLD', 'Sold'
    
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    seller = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='items_selling'
    )

    status = models.CharField(
        max_length=10,
        choices=Status.choices,
        default=Status.ON_SALE,
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} ({self.status})"