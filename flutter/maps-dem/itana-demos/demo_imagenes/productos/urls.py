from django.urls import path

from . import views

urlpatterns = [
    path("adm", views.AdmProductos.as_view(), name='adm-productos'),
    path("save", views.SaveProducto.as_view(), name='add-producto')
]