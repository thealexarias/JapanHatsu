from django.contrib import admin
from .models import Trip, ItineraryItem

# Register your models here.
admin.site.register(Trip)
admin.site.register(ItineraryItem)