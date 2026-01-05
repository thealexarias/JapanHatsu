import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ItineraryItemCard from "./ItineraryItemCard";
import { useAuth } from "../context/AuthContext";

export default function ItineraryPage() {
  const [itineraryItems, setItineraryItems] = useState([]);
  const [tripId, setTripId] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    const state = location.state || {};
    const savedTripId = state.tripId;
    const tripParams = state.tripParams;
    const autoGenerate = state.autoGenerate;


    if (savedTripId) {
      setTripId(savedTripId);
      axios
        .get(`http://127.0.0.1:8000/trips/${savedTripId}/`, {
          headers: { Authorization: `Token ${token}` },
        })
        .then((res) => {
          setItineraryItems(res.data.items || []);
        });
      return;
    }


    if (tripParams && autoGenerate) {
      axios
        .post("http://127.0.0.1:8000/trips/generate/", tripParams, {
          headers: { Authorization: `Token ${token}` },
        })
        .then((res) => {
          setItineraryItems(res.data || []);
          if (res.data?.length) setTripId(res.data[0].trip);
        });
      return;
    }


    navigate("/");
  }, [location.state, token, navigate]);

  const handleSave = async () => {
    await axios.post(
      `http://127.0.0.1:8000/trips/${tripId}/save/`,
      {},
      { headers: { Authorization: `Token ${token}` } }
    );
    navigate("/trips");
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Itinerary Page</h1>

        <button
          className="btn btn-dark"
          disabled={!tripId}
          onClick={handleSave}
        >
          Save Trip
        </button>
      </div>

      <div className="d-flex flex-wrap gap-3 mt-3">
        {itineraryItems.map((item) => (
          <ItineraryItemCard key={item.id} {...item} />
        ))}
      </div>
    </>
  );
}
