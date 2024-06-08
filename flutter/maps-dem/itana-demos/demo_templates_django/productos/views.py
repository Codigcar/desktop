from django.shortcuts import render
from django.views import View

# Create your views here.
class ViewProducto(View):
    def get(self, request):        
        return render(request, 'productos/productos.html', { })