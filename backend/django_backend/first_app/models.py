from django.db import models

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
