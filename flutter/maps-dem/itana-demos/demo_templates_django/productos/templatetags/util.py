import re
from django import template

from productos.models import Producto

register = template.Library()


@register.simple_tag()
def get_all_productos():
    return Producto.objects.all()

@register.filter
def agregar_guion(value):
    return re.sub("\s", "_", value).lower()