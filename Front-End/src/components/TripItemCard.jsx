export default function TripItemCard({
  tripId,
  start_date,
  end_date,
  budget,
  saved_at,
  onOpen,
  onDelete,
}) {
  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="card-body">
        <h5 className="card-title">
          Trip #{tripId}
        </h5>

        <p className="card-text">
          <strong>Dates:</strong> {start_date} → {end_date}
        </p>

        <p className="card-text">
          <strong>Budget:</strong> {budget}
        </p>

        <div className="d-flex gap-2">
          <button className="btn btn-dark btn-sm" onClick={onOpen}>
            Open
          </button>
          <button className="btn btn-outline-danger btn-sm" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
