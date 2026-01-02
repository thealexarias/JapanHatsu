from django.shortcuts import render, get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status as s
from rest_framework.status import HTTP_201_CREATED
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .services import generate_itinerary
from .models import Trip, ItineraryItem
from .serializers import TripSerializer, ItineraryItemSerializer
from django.utils import timezone

# okay, someone made a get request to /trip/generate. I'm going to go to my services.py file which has all my logic for generating and make a call there 
# from the call, I can return the respons 

# # trip/generate 
# class TripGeneratorView(APIView):
#     permission_classes = [IsAuthenticated]
#     # the request will include things like start_date, end_date, interests, etc..
#     def get(request):
#         trip = Trip.objects.create(**request.data)
#         it = generate_itinerary(Trip=trip, params=request.data)
#         return Response(it, status=HTTP_201_CREATED)
    


class TripGeneratorView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = TripSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        trip = serializer.save(user=request.user)

        try:
            itinerary_generated = generate_itinerary(trip, serializer.validated_data)
        except Exception as e:
            print(e)
            trip.delete()
            return Response(
                {"detail": "Unable to generate itinerary at this time."},
                status=s.HTTP_502_BAD_GATEWAY,
            )
        # items_data = itinerary_generated.get("items", [])
        # items_to_create = []
        # for entry in items_data:
        #     item_serializer = ItineraryItemSerializer(data=entry)
        #     item_serializer.is_valid(raise_exception=True)
        #     items_to_create.append(
        #         ItineraryItem(
        #             trip=trip,
        #             **item_serializer.validated_data,
        #             api_source=entry.get("api_source", "groq"),
        #         )
        #     )
        # print("B\n")
        # ItineraryItem.objects.bulk_create(items_to_create)
        # trip_serializer = TripSerializer(trip)
        # print(trip_serializer.data)
        res = ItineraryItemSerializer(itinerary_generated, many=True)
        return Response(res.data, status=s.HTTP_201_CREATED)


class ItineraryItemCollectionView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def post(self, request, trip_id):
        trip = get_object_or_404(Trip, pk=trip_id, user=request.user)
        serializer = ItineraryItemSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        item = serializer.save(
            trip=trip,
            api_source=request.data.get("api_source", "manual"),
        )
        return Response(
            ItineraryItemSerializer(item).data,
            status=s.HTTP_201_CREATED,
        )


class ItineraryItemDetailView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def put(self, request, trip_id, item_id):
        item = get_object_or_404(
            ItineraryItem,
            pk=item_id,
            trip__id=trip_id,
            trip__user=request.user,
        )
        serializer = ItineraryItemSerializer(item, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, trip_id, item_id):
        item = get_object_or_404(
            ItineraryItem,
            pk=item_id,
            trip__id=trip_id,
            trip__user=request.user,
        )
        item.delete()
        return Response(status=s.HTTP_204_NO_CONTENT)
    



class SavedTripsView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        trips = Trip.objects.filter(user=request.user, saved_at__isnull=False).order_by("-saved_at")
        return Response(TripSerializer(trips, many=True).data)


class TripSaveView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, trip_id):
        trip = get_object_or_404(Trip, pk=trip_id, user=request.user)
        trip.saved_at = timezone.now()
        trip.save()
        return Response({"detail": "Trip saved.", "trip_id": trip.id})


class TripDetailView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, trip_id):
        trip = get_object_or_404(Trip, pk=trip_id, user=request.user)
        return Response(TripSerializer(trip).data)

    def delete(self, request, trip_id):
        trip = get_object_or_404(Trip, pk=trip_id, user=request.user)
        trip.delete()
        return Response(status=s.HTTP_204_NO_CONTENT)
