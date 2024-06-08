from django.urls import path

from productos.views import ProductoView, ProductosAdm

urlpatterns = [
    # Categorias
    path('productos/', ProductosAdm.as_view(), name='productos_adm'),
    path('productos/<int:id>', ProductoView.as_view(), name='producto_view'),

]