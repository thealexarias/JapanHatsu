import requests

TOKYO_LAT = 35.6762
TOKYO_LON = 139.6503
BASE_URL = "https://api.open-meteo.com/v1/forecast"


def get_tokyo_daily_weather(start_date, end_date):
    params = {
        "latitude": TOKYO_LAT,
        "longitude": TOKYO_LON,
        "daily": "temperature_2m_max,temperature_2m_min,precipitation_sum,weathercode",
        "timezone": "Asia/Tokyo",
        "start_date": start_date.isoformat(),
        "end_date": end_date.isoformat(),
    }

    resp = requests.get(BASE_URL, params=params, timeout=15)
    resp.raise_for_status()
    data = resp.json()

    daily = data.get("daily") or {}
    dates = daily.get("time") or []
    tmax = daily.get("temperature_2m_max") or []
    tmin = daily.get("temperature_2m_min") or []
    precip = daily.get("precipitation_sum") or []
    codes = daily.get("weathercode") or []

    out = []
    for i in range(len(dates)):
        out.append(
            {
                "date": dates[i],
                "temp_max": tmax[i] if i < len(tmax) else None,
                "temp_min": tmin[i] if i < len(tmin) else None,
                "precip_mm": precip[i] if i < len(precip) else None,
                "weathercode": codes[i] if i < len(codes) else None,
            }
        )

    return out