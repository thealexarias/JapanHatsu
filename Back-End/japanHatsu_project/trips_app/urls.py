from django.urls import path
from .views import TripGeneratorView, ItineraryItemCollectionView, ItineraryItemDetailView

urlpatterns = [
    path("generate/", TripGeneratorView.as_view(), name="trip-generate"),
    path("<int:trip_id>/items/", ItineraryItemCollectionView.as_view(), name="itineraryitem-create"),
    path("<int:trip_id>/items/<int:item_id>/", ItineraryItemDetailView.as_view(), name="itineraryitem-detail"),
]
