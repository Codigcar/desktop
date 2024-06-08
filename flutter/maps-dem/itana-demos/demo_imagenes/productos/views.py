from django.http.response import HttpResponseRedirect
from django.shortcuts import render
from django.views import View
from productos.models import Producto
from productos.forms import ProductoForm
from django.urls import reverse


# Create your views here.
class AdmProductos(View):
    def get(self, request):
        productos = Producto.objects.all()
        return render(request, "productos/adm-productos.html", {
            "productos": productos
        })

class SaveProducto(View):
    def get(self, request):
        form = ProductoForm()
        return render(request, "productos/add-producto.html", {
            "form": form
        })

    def post(self, request):
        form = ProductoForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse('adm-productos'))

