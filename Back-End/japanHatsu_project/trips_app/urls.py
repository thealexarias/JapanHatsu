from django.urls import path
from .views import TripGeneratorView, ItineraryItemCollectionView, ItineraryItemDetailView, SavedTripsView, TripSaveView, TripDetailView

urlpatterns = [
    path("generate/", TripGeneratorView.as_view(), name="trip-generate"),
    path("<int:trip_id>/items/", ItineraryItemCollectionView.as_view(), name="itineraryitem-create"),
    path("<int:trip_id>/items/<int:item_id>/", ItineraryItemDetailView.as_view(), name="itineraryitem-detail"),
    path("saved/", SavedTripsView.as_view(), name="trips-saved"),
    path("<int:trip_id>/save/", TripSaveView.as_view(), name="trip-save"),
    path("<int:trip_id>/", TripDetailView.as_view(), name="trip-detail"),
]
