// import { useState } from "react";
// import ItineraryItemCard from "./ItineraryItemCard";

// export default function ItineraryPage() {
//   const [itineraryItems, setItineraryItems] = useState([]);

//   return (
//     <>
//       <h1>Itinerary Page</h1>

//       <div className="d-flex flex-wrap gap-3">
//         {itineraryItems.map(
//           ({
//             id,
//             day_number,
//             title,
//             category,
//             description,
//             location,
//             image_url,
//             start_time,
//             end_time,
//           }) => (
//             <ItineraryItemCard
//               key={id}
//               day_number={day_number}
//               title={title}
//               category={category}
//               description={description}
//               location={location}
//               image_url={image_url}
//               start_time={start_time}
//               end_time={end_time}
//             />
//           )
//         )}
//       </div>
//     </>
//   );
// }


import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ItineraryItemCard from "./ItineraryItemCard";
import { useAuth } from "../context/AuthContext";

export default function ItineraryPage() {
  const [itineraryItems, setItineraryItems] = useState([]);
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

  return (
    <>
      <h1>Itinerary Page</h1>

      <div className="d-flex flex-wrap gap-3">
        {itineraryItems.map((item) => (
          <ItineraryItemCard key={item.id} {...item} />
        ))}
      </div>
    </>
  );
}
