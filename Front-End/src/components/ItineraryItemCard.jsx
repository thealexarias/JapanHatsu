import { useMemo, useState } from "react";

export default function ItineraryItemCard({
  id,
  day_number,
  title,
  description,
  location,
  image_url,
  start_time,
  end_time,
  onDelete,
  onUpdate,
}) {
  const [isEditing, setIsEditing] = useState(false);

  // ✅ only show image if it loads successfully
  const [imgOk, setImgOk] = useState(false);

  const [draft, setDraft] = useState({
    day_number: day_number || 1,
    title: title || "",
    location: location || "",
    start_time: start_time || "",
    end_time: end_time || "",
    description: description || "",
  });

  const dayOptions = useMemo(() => Array.from({ length: 30 }, (_, i) => i + 1), []);

  const startEdit = () => {
    setDraft({
      day_number: day_number || 1,
      title: title || "",
      location: location || "",
      start_time: start_time || "",
      end_time: end_time || "",
      description: description || "",
    });
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  const saveEdit = async () => {
    await onUpdate(id, {
      ...draft,
      day_number: Number(draft.day_number),
      image_url: image_url || "",
    });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="card" style={{ width: "18rem" }}>
      {/* ✅ show image only if it exists AND successfully loads */}
      {image_url && imgOk ? (
        <img
          className="card-img-top"
          src={image_url}
          alt="" // ✅ prevents the title from "duplicating" as hover text
        />
      ) : null}

      {/* Hidden preloader: determines if URL actually works */}
      {image_url && !imgOk ? (
        <img
          src={image_url}
          alt=""
          style={{ display: "none" }}
          onLoad={() => setImgOk(true)}
          onError={() => setImgOk(false)}
        />
      ) : null}

      <div className="card-body">
        {!isEditing ? (
          <>
            <h5 className="card-title">Day number: {day_number}</h5>
            <h5 className="card-title">{title}</h5>

            {(start_time || end_time) && (
              <h6 className="card-subtitle mb-2 text-muted">
                {start_time} {start_time && end_time ? "to" : ""} {end_time}
              </h6>
            )}

            <p className="card-text mb-1">
              <strong>Location:</strong> {location || "—"}
            </p>

            {description ? <p className="card-text">{description}</p> : null}

            <div className="d-flex gap-2 mt-2">
              {onUpdate && (
                <button className="btn btn-outline-dark btn-sm" onClick={startEdit}>
                  Edit
                </button>
              )}

              {onDelete && (
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => onDelete(id)}
                >
                  Delete
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="mb-2">
              <label className="form-label">Day</label>
              <select
                className="form-select"
                name="day_number"
                value={draft.day_number}
                onChange={handleChange}
              >
                {dayOptions.map((d) => (
                  <option key={d} value={d}>
                    Day {d}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-2">
              <label className="form-label">Title</label>
              <input
                className="form-control"
                name="title"
                value={draft.title}
                onChange={handleChange}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Location</label>
              <input
                className="form-control"
                name="location"
                value={draft.location}
                onChange={handleChange}
              />
            </div>

            <div className="row g-2 mb-2">
              <div className="col-6">
                <label className="form-label">Start</label>
                <input
                  className="form-control"
                  name="start_time"
                  value={draft.start_time}
                  onChange={handleChange}
                  placeholder="HH:MM"
                />
              </div>
              <div className="col-6">
                <label className="form-label">End</label>
                <input
                  className="form-control"
                  name="end_time"
                  value={draft.end_time}
                  onChange={handleChange}
                  placeholder="HH:MM"
                />
              </div>
            </div>

            <div className="mb-2">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                name="description"
                value={draft.description}
                onChange={handleChange}
                rows={2}
              />
            </div>

            <div className="d-flex gap-2 mt-2">
              <button className="btn btn-dark btn-sm" onClick={saveEdit}>
                Save
              </button>
              <button className="btn btn-outline-secondary btn-sm" onClick={cancelEdit}>
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
