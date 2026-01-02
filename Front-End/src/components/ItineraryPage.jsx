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
    const tripParams = location.state?.tripParams;
    const autoGenerate = location.state?.autoGenerate;

    // if user visits /itinerary directly (no state), bounce home
    if (!tripParams) {
      navigate("/");
      return;
    }

    // only generate when coming from homepage
    if (!autoGenerate) return;

    axios
      .post("http://127.0.0.1:8000/trips/generate/", tripParams, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setItineraryItems(res.data); // backend returns a LIST of itinerary items
      });
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

      <div className="d-flex flex-wrap gap-3">
        {itineraryItems.map((item) => (
          <ItineraryItemCard key={item.id} {...item} />
        ))}
      </div>
    </>
  );
}
