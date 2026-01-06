import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function WeatherPanel({ tripId }) {
  const { token } = useAuth();
  const [weather, setWeather] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!tripId) return;

    setError("");
    axios
      .get(`http://127.0.0.1:8000/trips/${tripId}/weather/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        setWeather(res.data.daily || []);
      })
      .catch(() => {
        setError("Could not load Tokyo weather.");
      });
  }, [tripId, token]);

  return (
    <div className="card p-3 mt-3">
      <h5 className="mb-2">Tokyo Weather</h5>

      {error && <div className="alert alert-warning mb-2">{error}</div>}

      {!error && weather.length === 0 && (
        <div className="text-muted">Loading...</div>
      )}

      {weather.length > 0 && (
        <div className="table-responsive">
          <table className="table table-sm mb-0">
            <thead>
              <tr>
                <th>Date</th>
                <th>High</th>
                <th>Low</th>
                <th>Precip (mm)</th>
              </tr>
            </thead>
            <tbody>
              {weather.map((d) => (
                <tr key={d.date}>
                  <td>{d.date}</td>
                  <td>{d.temp_max ?? "—"}</td>
                  <td>{d.temp_min ?? "—"}</td>
                  <td>{d.precip_mm ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
