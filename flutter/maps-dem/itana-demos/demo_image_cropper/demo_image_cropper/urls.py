from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from django.urls.conf import include
from banner import views

urlpatterns = [
    path('banners', views.Banners.as_view(), name='banners'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
