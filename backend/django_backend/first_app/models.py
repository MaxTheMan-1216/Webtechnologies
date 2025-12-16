from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Item(models.Model):
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
