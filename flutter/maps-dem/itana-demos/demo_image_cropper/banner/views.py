from django.shortcuts import render, redirect
from django.views import View

from banner.forms import BannerForm
from banner.models import Banner
from django.core.files.images import get_image_dimensions

# Create your views here.


class Banners(View):
    def get(self, request):
        form = BannerForm()
        banners = Banner.objects.all()
        return render(request, 'banners/add-banner.html', {
            'form': form,
            'banners': banners
        })

    def post(self, request):
        # Gets the uploaded data and maps it to the ProfileForm object
        form = BannerForm(request.POST, request.FILES)
        if form.is_valid():
            width, height = get_image_dimensions(form.cleaned_data['image'])

            form.save()  # Saves the uploaded data into our Database model
            print(width, height)
            return redirect('banners')  # Makes the page redirect back to home
