from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


# Create your models here.

class Cliente(models.Model):
  cod_cliente = models.AutoField(primary_key=True)
  nombres = models.CharField(max_length=100)
  apellidos = models.CharField(max_length=100)
  email = models.EmailField(null=True)
  fecha_nacimiento = models.DateField(null=True)
  direccion = models.CharField(max_length=200, null=True)
  calificacion = models.IntegerField(null = True, validators=[MinValueValidator(1), MaxValueValidator(5)])
  nro_dni = models.CharField(max_length=8, null=False, default="NNNNNNNN")
  imagen_avatar = models.ImageField(upload_to="imagenes", null=True)

  def __str__(self):
      return f"{self.nombres} {self.apellidos} con email: {self.email}"

class Producto(models.Model):
  cod_producto = models.CharField(max_length=6, null=False)
  nombre = models.CharField(max_length=100, null=False)
  precio_pen = models.DecimalField(max_digits=7, decimal_places=2)
  def __str__(self):
    return f"{self.cod_producto} {self.nombre} {self.precio_pen}"



class Orden(models.Model):
  class Meta:
    verbose_name_plural = "ordenes"
  nro_orden = models.AutoField(primary_key=True)
  fecha_hora_registro = models.DateTimeField(null=False)
  moneda = models.CharField(max_length=3)
  monto = models.DecimalField(max_digits=7, decimal_places=2)
  cliente = models.ForeignKey(Cliente, on_delete=models.SET_NULL, null=True, related_name="ordenes")
  productos = models.ManyToManyField(Producto)

  def __str__(self):
      return f"{self.nro_orden} {self.moneda} {self.monto}"


