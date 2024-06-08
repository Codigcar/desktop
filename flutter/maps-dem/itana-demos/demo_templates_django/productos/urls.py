from django.urls import path

from productos.views import ViewProducto
urlpatterns = [
    path('', ViewProducto.as_view(), name='home'),
]