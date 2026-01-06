import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ItineraryItemCard from "./ItineraryItemCard";
import AddItineraryItemForm from "./AddItineraryItemForm";
import { useAuth } from "../context/AuthContext";

function timeToMinutes(t) {
  if (!t || typeof t !== "string") return 99999;
  const [hh, mm] = t.split(":").map((x) => Number(x));
  if (Number.isNaN(hh) || Number.isNaN(mm)) return 99999;
  return hh * 60 + mm;
}

function sortItems(items) {
  return [...items].sort((a, b) => {
    const dayA = a.day_number ?? 0;
    const dayB = b.day_number ?? 0;
    if (dayA !== dayB) return dayA - dayB;

    const tA = timeToMinutes(a.start_time);
    const tB = timeToMinutes(b.start_time);
    if (tA !== tB) return tA - tB;

    return (a.id ?? 0) - (b.id ?? 0);
  });
}

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

    // Open a saved trip from saved trips
    if (savedTripId) {
      setTripId(savedTripId);
      axios
        .get(`http://127.0.0.1:8000/trips/${savedTripId}/`, {
          headers: { Authorization: `Token ${token}` },
        })
        .then((res) => {
          setItineraryItems(sortItems(res.data.items || []));
        });
      return;
    }

    // Generate a new trip from homepage
    if (tripParams && autoGenerate) {
      axios
        .post("http://127.0.0.1:8000/trips/generate/", tripParams, {
          headers: { Authorization: `Token ${token}` },
        })
        .then((res) => {
          const items = res.data || [];
          setItineraryItems(sortItems(items));
          if (items?.length) setTripId(items[0].trip);
        });
      return;
    }

    
    navigate("/");
  }, [location.state, token, navigate]);

  const maxDay = useMemo(() => {
    if (!itineraryItems.length) return 1;
    return Math.max(...itineraryItems.map((i) => i.day_number || 1));
  }, [itineraryItems]);

  const handleSave = async () => {
    await axios.post(
      `http://127.0.0.1:8000/trips/${tripId}/save/`,
      {},
      { headers: { Authorization: `Token ${token}` } }
    );
    navigate("/trips");
  };

  // create custom itinerary item
  const handleAddCustomItem = async (payload) => {
    const res = await axios.post(
      `http://127.0.0.1:8000/trips/${tripId}/items/`,
      {
        ...payload,
        category: "local",
        image_url: "",
        api_source: "manual",
      },
      { headers: { Authorization: `Token ${token}` } }
    );

    setItineraryItems((prev) => sortItems([...prev, res.data]));
  };

  // delete itinerary item 
  const handleDeleteItem = async (itemId) => {
    await axios.delete(
      `http://127.0.0.1:8000/trips/${tripId}/items/${itemId}/`,
      { headers: { Authorization: `Token ${token}` } }
    );

    setItineraryItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const handleUpdateItem = async (itemId, payload) => {
  const res = await axios.put(
    `http://127.0.0.1:8000/trips/${tripId}/items/${itemId}/`,
    payload,
    { headers: { Authorization: `Token ${token}` } }
  );

  setItineraryItems((prev) =>
    sortItems(prev.map((i) => (i.id === itemId ? res.data : i)))
  );
};


  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Itinerary Page</h1>

        <button className="btn btn-dark" disabled={!tripId} onClick={handleSave}>
          Save Trip
        </button>
      </div>

      <div className="d-flex flex-wrap gap-3 mt-3">
        {itineraryItems.map((item) => (
          <ItineraryItemCard
            key={item.id}
            {...item}
            onDelete={handleDeleteItem}
            onUpdate={handleUpdateItem}
          />
        ))}
      </div>


      {tripId && (
        <AddItineraryItemForm maxDay={maxDay} onSubmit={handleAddCustomItem} />
      )}
    </>
  );
}
