
export default function ItineraryItemCard({day_number, title, category, description, location, image_url, start_time, end_time}) {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <img
        className="card-img-top"
        src={image_url}
      />
      <div className="card-body">
        <h5 className="card-title">Day number: {day_number}</h5>
        <h5 className="card-title">{title}</h5>
        <h5 className="card-title">{start_time} to {end_time}</h5>
        <h5 className="card-title">location: {location}</h5>
        <h5 className="card-title">category: {category}</h5>
        <p className="card-text">
          {description}
        </p>
      </div>
    </div>
  );
}