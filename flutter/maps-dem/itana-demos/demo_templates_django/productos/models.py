from django.db import models

# Create your models here.
class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    precio = models.DecimalField(decimal_places=2, max_digits=10)
