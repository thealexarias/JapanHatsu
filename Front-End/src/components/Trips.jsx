import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import TripItemCard from "./TripItemCard";

export default function TripsPage() {
  const [trips, setTrips] = useState([]);
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/trips/saved/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => setTrips(res.data));
  }, [token]);

  const openTrip = (tripId) => {
    navigate("/itinerary", {
      state: { tripId, autoGenerate: false },
    });
  };

  const deleteTrip = async (tripId) => {
    await axios.delete(
      `http://127.0.0.1:8000/trips/${tripId}/`,
      { headers: { Authorization: `Token ${token}` } }
    );
    setTrips((prev) => prev.filter((t) => t.id !== tripId));
  };

  return (
    <>
      <h1>Saved Trips Page</h1>

      <div className="d-flex flex-wrap gap-3 mt-3">
        {trips.map((trip) => (
          <TripItemCard
            key={trip.id}
            tripId={trip.id}
            start_date={trip.start_date}
            end_date={trip.end_date}
            budget={trip.budget}
            onOpen={() => openTrip(trip.id)}
            onDelete={() => deleteTrip(trip.id)}
          />
        ))}
      </div>
    </>
  );
}
