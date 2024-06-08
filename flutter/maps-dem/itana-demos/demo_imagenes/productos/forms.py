from django import forms
from productos.models import Producto

class ProductoForm(forms.ModelForm):
    class Meta:
        model = Producto
        fields = ['id', 'nombre', 'descripcion', 'precio_pen', 'imagen']

    nombre = forms.CharField(widget=forms.TextInput(attrs={"class":"form-control"}),  max_length=50)
    descripcion = forms.CharField (widget=forms.Textarea(attrs={"class":"form-control"}), max_length=100)
    precio_pen = forms.DecimalField(widget=forms.NumberInput(attrs={"class":"form-control"}), max_digits=7, decimal_places=2)
    imagen = forms.ImageField(label="Avatar", required=False, widget=forms.FileInput(attrs={'class':'form-control'}))