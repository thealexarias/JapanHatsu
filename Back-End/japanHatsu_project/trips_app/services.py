# services.py takes care of the logic for the views

# and the views talks to the user basically and based on that response, may do some work and give it back to the user 


# so the user will input some parameters for us (e.g., start date, end date, etc.) then the frontend will send that information over to the backend via a POST request
# which will then prompt the backend to ask Groq to generate an itinerary and the backend will that generated itinerary and save it off as a Trip + ItineraryItem object in the DB.
# Next, the backend will take that recently saved object and send it over to the frontend via a GET request so the frontend can display it to the user 
# 


# But if the user doesn't like something, they can UPDATE, DELETE, CREATE an interary item or the entire trip  


from openai import OpenAI
import os
import json
from dotenv import load_dotenv
from .models import Trip, ItineraryItem


load_dotenv()

client = OpenAI(
    api_key=os.environ.get("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1",
)


def generate_prompt(params):
    return (f"""
        Can you generate a itinerary for a first-time traveler to Japan given these criteria given by the user:
        Start date: {params["start_date"]}
        End date: {params["end_date"]}
        Budget: {params["budget"]}
        Interests: {params["interests"]}
        Group: {params["group_type"]}
        Group Details: {params["group_details"]}
        Preferred Cities: {params["preferred_cities"]}
        Note: I'm saving this generated itinerary in Django. My Trip model and IteraryItem look like this:
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
        Moreover, each itinerary item should be for either the morning, afternoon, or evening. Return ONLY valid JSON, no markdown, no commentary.
        """)


def generate_itinerary(trip, params):
    # generate the itinerary
    response = client.responses.create(
        model="openai/gpt-oss-20b",
        input= generate_prompt(params))
    data = json.loads(response.output_text)
    
    # turn the itinerary json into itineraryItem objects 
    res = []
    for itineraryItem in data:
        itineraryItem = dict(itineraryItem)
        itineraryItem["trip"] = trip
        it = ItineraryItem.objects.create(**itineraryItem)
        res.append(it)
    # feed this to the view to then feed into the user 
    return res