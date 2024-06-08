from django import forms 

class ClienteForm(forms.Form):
  nombres = forms.CharField(max_length=100, min_length=3, widget=forms.TextInput(attrs={'class':'form-control'}), error_messages={
    'required': "Debe ingresar los nombres para registrar", 
    'min_length': "Debe ingresar al menos 3 caracteres"
  })
  apellidos = forms.CharField(max_length=100, min_length=3, widget=forms.TextInput(attrs={'class':'form-control'}))
  email = forms.EmailField(label="Correo", required=False, widget=forms.TextInput(attrs={'class':'form-control'}))
  imagen_avatar = forms.ImageField(label="Avatar", required=False, widget=forms.FileInput(attrs={'class':'form-control'}))

class LoginForm(forms.Form):
  username = forms.CharField(max_length=100, min_length=3, widget=forms.TextInput(attrs={'class':'form-control'}))
  password = forms.CharField(min_length=6, widget=forms.PasswordInput(attrs={'class':'form-control'}))
