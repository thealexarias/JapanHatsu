import { useState } from "react";
import ItineraryItemCard from "./ItineraryItemCard";

export default function ItineraryPage() {
  const [itineraryItems, setItineraryItems] = useState([]);

  return (
    <>
      <h1>Itinerary Page</h1>

      <div className="d-flex flex-wrap gap-3">
        {itineraryItems.map(
          ({
            id,
            day_number,
            title,
            category,
            description,
            location,
            image_url,
            start_time,
            end_time,
          }) => (
            <ItineraryItemCard
              key={id}
              day_number={day_number}
              title={title}
              category={category}
              description={description}
              location={location}
              image_url={image_url}
              start_time={start_time}
              end_time={end_time}
            />
          )
        )}
      </div>
    </>
  );
}