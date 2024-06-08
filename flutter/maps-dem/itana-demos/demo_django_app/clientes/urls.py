from django.urls import path
from django.urls.conf import include
from . import views

urlpatterns = [
    path('adm/', views.adm_clientes, name="adm-clientes"),
    path('view/<int:cod_cliente>', views.view_cliente, name="ver-cliente"),
    path('save', views.save_cliente, name="crear-cliente"),
    path('login', views.login, name="login"),
    path('logout', views.logout, name="logout")
] 

