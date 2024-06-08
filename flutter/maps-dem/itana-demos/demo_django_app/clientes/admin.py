from django.contrib import admin
from clientes.models import Cliente, Orden, Producto


class ClienteAdmin(admin.ModelAdmin):
    list_display = ('cod_cliente', 'nombres', 'apellidos', 'email')

class OrdenAdmin(admin.ModelAdmin):
    list_display = ('nro_orden', 'fecha_hora_registro', 'moneda', 'monto')

class ProductoAdmin(admin.ModelAdmin):
    list_display = ('cod_producto', 'nombre', 'precio_pen')

# Register your models here.
admin.site.register(Cliente, ClienteAdmin)

admin.site.register(Orden, OrdenAdmin)

admin.site.register(Producto, ProductoAdmin)

