from django.db import models

# Create your models here.
class Producto(models.Model):
    nombre = models.CharField(null=False, max_length=50)
    precio = models.DecimalField(max_digits=7, decimal_places=2)
    imagen = models.ImageField(upload_to='productos/', null=True, blank=True)