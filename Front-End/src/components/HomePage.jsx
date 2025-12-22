import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const INITIAL_TRIP = {
  start_date: '',
  end_date: '',
  budget: '',
  group_type: '',
  group_details: '',
  interests: '',
  preferred_cities: '',
}

export default function HomePage() {
  const [trip, setTrip] = useState(INITIAL_TRIP)
  const navigate = useNavigate()

  function handleChange(event) {
    const { name, value } = event.target
    setTrip((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <section className="home-hero container py-4">
      <h1 className="mb-3 text-center">Welcome to Japan Hatsu</h1>
      <p className="text-muted text-center mb-4">YOU READY FOR JAPAN?!?!?!?</p>

      <form className="row g-3">
        <div className="col-md-6">
          <label className="form-label" htmlFor="start_date">
            Start Date
          </label>
          <input
            id="start_date"
            name="start_date"
            type="date"
            className="form-control"
            value={trip.start_date}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label" htmlFor="end_date">
            End Date
          </label>
          <input id="end_date" name="end_date" type="date" className="form-control" value={trip.end_date} onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label" htmlFor="budget">
            Budget
          </label>
          <select id="budget" name="budget" className="form-select" value={trip.budget} onChange={handleChange}>
            <option value="">Select budget</option>
            <option value="budget">Budget</option>
            <option value="moderate">Moderate</option>
            <option value="luxury">Luxury</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label" htmlFor="group_type">
            Group Type
          </label>
          <select id="group_type" name="group_type" className="form-select" value={trip.group_type} onChange={handleChange}>
            <option value="">Choose group type</option>
            <option value="solo">Solo</option>
            <option value="couple">Couple</option>
            <option value="family">Family</option>
            <option value="friends">Friends</option>
          </select>
        </div>

        <div className="col-12">
          <label className="form-label" htmlFor="group_details">
            Group Details
          </label>
          <input
            id="group_details"
            name="group_details"
            type="text"
            className="form-control"
            placeholder="e.g. anniversary trip, foodie explorers, etc."
            value={trip.group_details}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label className="form-label" htmlFor="interests">
            Interests
          </label>
          <input
            id="interests"
            name="interests"
            type="text"
            className="form-control"
            placeholder="food, anime, temples"
            value={trip.interests}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label className="form-label" htmlFor="preferred_cities">
            Preferred Cities
          </label>
          <input
            id="preferred_cities"
            name="preferred_cities"
            type="text"
            className="form-control"
            placeholder="Tokyo, Kyoto, Osaka"
            value={trip.preferred_cities}
            onChange={handleChange}
          />
        </div>

        <div className="col-12 text-center">
          <button
            className="btn btn-dark px-4"
            type="button"
            onClick={() =>
              navigate('/itinerary', {
                state: { tripParams: trip, autoGenerate: true },
              })
            }
          >
            Continue to Itinerary
          </button>
        </div>
      </form>
    </section>
  )
}

