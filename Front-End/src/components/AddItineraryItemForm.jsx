import { useMemo, useState } from "react";

const INITIAL = {
  day_number: 1,
  title: "",
  description: "",
  location: "",
  start_time: "",
  end_time: "",
};

export default function AddItineraryItemForm({ maxDay = 1, onSubmit }) {
  const [form, setForm] = useState({ ...INITIAL, day_number: maxDay });

  const dayOptions = useMemo(() => {
    const days = [];
    for (let i = 1; i <= Math.max(1, maxDay); i++) days.push(i);
    return days;
  }, [maxDay]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "day_number" ? Number(value) : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
    setForm((prev) => ({ ...INITIAL, day_number: prev.day_number }));
  }

  return (
    <form className="card p-3 mt-4" onSubmit={handleSubmit}>
      <h5 className="mb-3">Add Custom Activity</h5>

      <div className="row g-2">
        <div className="col-12">
          <label className="form-label">Day</label>
          <select
            className="form-select"
            name="day_number"
            value={form.day_number}
            onChange={handleChange}
          >
            {dayOptions.map((d) => (
              <option key={d} value={d}>
                Day {d}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12">
          <label className="form-label">Title</label>
          <input
            className="form-control"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Ramen at Ichiran"
            required
          />
        </div>

        <div className="col-12">
          <label className="form-label">Location</label>
          <input
            className="form-control"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g. Shibuya, Tokyo"
          />
        </div>

        <div className="col-6">
          <label className="form-label">Start Time</label>
          <input
            className="form-control"
            name="start_time"
            value={form.start_time}
            onChange={handleChange}
            placeholder="HH:MM (e.g. 10:00)"
          />
        </div>

        <div className="col-6">
          <label className="form-label">End Time</label>
          <input
            className="form-control"
            name="end_time"
            value={form.end_time}
            onChange={handleChange}
            placeholder="HH:MM (e.g. 12:00)"
          />
        </div>

        <div className="col-12">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Optional notes..."
            rows={2}
          />
        </div>

        <div className="col-12 d-flex justify-content-end">
          <button className="btn btn-dark" type="submit">
            Add Item
          </button>
        </div>
      </div>
    </form>
  );
}
