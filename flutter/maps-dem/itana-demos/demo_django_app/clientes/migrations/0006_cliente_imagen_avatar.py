# Generated by Django 3.2.8 on 2021-12-23 14:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clientes', '0005_auto_20211216_2041'),
    ]

    operations = [
        migrations.AddField(
            model_name='cliente',
            name='imagen_avatar',
            field=models.ImageField(null=True, upload_to='imagenes'),
        ),
    ]
