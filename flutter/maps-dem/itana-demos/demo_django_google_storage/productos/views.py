from math import prod
from django.shortcuts import render
from django.views import View
from .models import Producto
# Create your views here.
class ProductosAdm(View):
    def get(self, request):
        productos= Producto.objects.all()
        return render(request, 'productos/adm-productos.html', {
            'productos': productos
        })

class ProductoView(View):
    def get(self, request, id):
        producto= Producto.objects.get(id = id)
        return render(request, 'productos/view-producto.html', {
            'producto': producto
        })