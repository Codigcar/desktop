# Django Demo

### Crear y usar virtual environment
```
python3 -m venv django-env
source django-env/bin/activate (Mac)
django-env/Scripts/activate.bat (Windows)
```

### Instalar django
```
python -m pip install django
django-admin
```

### Crear el Proyecto Web en Django
```
django-admin startproject demo_django_app
```

### Instalar las extensiones
* Python
* Pylance
* Configurar el formateador autopep8
* Agregar al settings.json del VScode
```
    "python.languageServer": "Pylance",

```


### Iniciar aplicacion
```
python manage.py runserver
```

### Crear Django App (Modulo)
```
python manage.py startapp clientes
python manage.py startapp productos
```


### BD(MySQL)
```
docker run -it -p 3306:3306 -e TZ=America/Lima -e MYSQL_ROOT_PASSWORD=secreto -e MYSQL_DATABASE=django_demo -e MYSQL_USER=django_demo -e MYSQL_PASSWORD=secreto --name django_demo mysql:8.0.23 --character-set-server=latin1 --collation-server=latin1_general_ci 

```

### Instalar MySQL Client
```
brew install mysql-client

export PATH="/usr/local/opt/mysql-client/bin:$PATH"

pip install mysqlclient
```

### Manejo de Imagenes
* Requiere la siguiente dependencia
* Referencia: https://pillow.readthedocs.io/en/latest/installation.html
```
python -m pip install --upgrade pip
python -m pip install --upgrade Pillow
```