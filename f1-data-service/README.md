# F1 Data Service

Python/Flask microservice using FastF1 for Formula 1 data.

## Local Development

```bash
cd f1-data-service
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python app.py
```

Service runs on `http://localhost:5001`

## Endpoints

- `GET /api/schedule/<year>` - Race calendar
- `GET /api/drivers/<year>` - Driver list
- `GET /api/race/<year>/<round>` - Race details
- `GET /api/telemetry/<year>/<round>/<driver>` - Telemetry data
- `GET /api/live/timing` - Live timing (during sessions)

## Deployment

Deploy to Render.com as a Python Web Service.
- Build: `pip install -r requirements.txt`
- Start: `gunicorn app:app`
