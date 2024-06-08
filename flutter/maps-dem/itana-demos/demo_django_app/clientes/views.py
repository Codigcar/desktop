from datetime import date
from django.http.response import HttpResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from clientes.forms import ClienteForm, LoginForm
from clientes.models import Cliente
from django.urls import reverse
from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth import logout as auth_logout

# Create your views here.
'''
clientes = [
  {
    "cod_cliente": 1001,
    "nombres": "Juan Jose",
    "apellidos": "Perez Acosta",
    "email": "jperez@gmail.com",
    "fecha_nacimiento": date(1995, 7, 1)
  },
  {
    "cod_cliente": 1002,
    "nombres": "Maria Alejandra",
    "apellidos": "Aguinaga Lopez",
    "email": "maguinaga@gmail.com",
    "fecha_nacimiento": date(1990, 9, 16)
  },
]
'''

def adm_clientes(request):
  clientes = Cliente.objects.all()
  # user = request.session.get("user")
  # if user is None:
  if not request.user.is_authenticated:
    return HttpResponseRedirect(reverse("login"))
  return render(request, "clientes/adm-clientes.html", {
    "clientes": clientes
  })

def view_cliente(request, cod_cliente):

  # cliente_encontrado = Cliente.objects.get(cod_cliente= cod_cliente)
  cliente_encontrado = get_object_or_404(Cliente, cod_cliente = cod_cliente)
  return render(request, "clientes/view-cliente.html", {
    "cliente": cliente_encontrado
  })

def save_cliente(request):
  if request.method == 'POST':
    print(request.FILES["imagen_avatar"])
    clienteform = ClienteForm(request.POST, request.FILES)
    if clienteform.is_valid():
      print(clienteform.cleaned_data)
      cliente_data = clienteform.cleaned_data
      cliente = Cliente(
        nombres=cliente_data['nombres'], 
        apellidos=cliente_data['apellidos'], 
        email = cliente_data['email'],
        imagen_avatar = request.FILES["imagen_avatar"])
      cliente.save()
      return HttpResponseRedirect(reverse("adm-clientes"))
  else: 
    clienteform = ClienteForm()
  return render(request, "clientes/save-cliente.html", {
    "form": clienteform
  })

def login(request):
  if request.method == 'POST':
    loginform = LoginForm(request.POST)
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(request, username=username, password=password)
    if loginform.is_valid and user is not None:
      auth_login(request, user)
      return HttpResponseRedirect(reverse("adm-clientes"))
    else:
      # Return an 'invalid login' error message.
      pass
    '''
    if request.POST['user'] == 'JCABELLOC':
      request.session["user"] = request.POST['user']
      return HttpResponseRedirect(reverse("adm-clientes"))
    '''
  else:
    loginform = LoginForm()
  return render(request, "clientes/login.html", {
    "form": loginform
  })
def logout(request):
  auth_logout(request)
  return HttpResponseRedirect(reverse("login"))




  '''
  nombres_usuario = request.POST['nombres']
  print(nombres_usuario)
  if (nombres_usuario == "" or len(nombres_usuario) <=3):
    return render(request, "clientes/save-cliente.html", {
      "has_error": True
    })      
  return HttpResponseRedirect(reverse("adm-clientes"))
  '''

