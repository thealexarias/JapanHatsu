from django.db import models
from django.conf import settings


# Create your models here.
class Trip(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    budget = models.CharField(max_length=50)
    group_type = models.CharField(max_length=50)
    group_details = models.CharField(max_length=100, blank=True)
    interests = models.JSONField()
    preferred_cities = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    saved_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username}'s Trip ({self.start_date} → {self.end_date})"



class ItineraryItem(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name="items")
    day_number = models.IntegerField()
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=50)  # touristy, iconic, local, unique
    description = models.TextField(blank=True)
    location = models.CharField(max_length=255, blank=True)
    image_url = models.CharField(max_length=500, blank=True)
    start_time = models.CharField(max_length=20, blank=True)
    end_time = models.CharField(max_length=20, blank=True)
    api_source = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return f"Day {self.day_number}: {self.title}"