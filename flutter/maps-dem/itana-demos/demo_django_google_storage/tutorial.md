# 1. Creamos un bucket en google cloud 
* Nombre del bucket
* Ubicacion: us-central
* Tipo de almacenamiento: Standard
* Control de acceso: Preciso
* Proteger datos: Ninguno

# 2. Creamos un Service account

https://cloud.google.com/docs/authentication/getting-started

y obtenemos el .json

```
export GOOGLE_APPLICATION_CREDENTIALS=../../django/credentials/light-scarab-351216-c964368b0ea9.json
```

# 3. Configuracion en django:
``` 
pip install django-storages[google]
```

en settings:
```
DEFAULT_FILE_STORAGE = 'storages.backends.gcloud.GoogleCloudStorage'
GS_BUCKET_NAME = 'bucket-django'
STATICFILES_STORAGE = 'storages.backends.gcloud.GoogleCloudStorage'
```

subir archivos a Cloud Storage:
```
python manage.py collectstatic
```