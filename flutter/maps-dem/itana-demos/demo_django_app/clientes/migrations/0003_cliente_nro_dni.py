# Generated by Django 3.2.8 on 2021-12-16 16:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0002_cliente_calificacion'),
    ]

    operations = [
        migrations.AddField(
            model_name='cliente',
            name='nro_dni',
            field=models.CharField(default='NNNNNNNN', max_length=8),
        ),
    ]
