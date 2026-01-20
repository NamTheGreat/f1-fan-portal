import os
import fastf1
from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

# Enable FastF1 cache for better performance
cache_dir = os.path.join(os.path.dirname(__file__), 'cache')
os.makedirs(cache_dir, exist_ok=True)
fastf1.Cache.enable_cache(cache_dir)

@app.route('/')
def health():
    return jsonify({"status": "ok", "service": "F1 Data Service (FastF1)"})

# ============ RACE SCHEDULE ============
@app.route('/api/schedule/<int:year>')
def get_schedule(year):
    try:
        schedule = fastf1.get_event_schedule(year)
        races = []
        for idx, event in schedule.iterrows():
            # Skip testing events
            if 'test' in event['EventName'].lower():
                continue
            races.append({
                'id': int(event['RoundNumber']),
                'round': int(event['RoundNumber']),
                'name': event['EventName'],
                'country': event['Country'],
                'circuit': event['Location'],
                'date': str(event['EventDate'])[:10] if pd.notna(event['EventDate']) else '',
                'format': event['EventFormat']
            })
        return jsonify(races)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ============ DRIVERS ============
@app.route('/api/drivers/<int:year>')
def get_drivers(year):
    try:
        # Get the first race of the year to extract driver info
        schedule = fastf1.get_event_schedule(year)
        # Find first non-testing event
        first_race = None
        for idx, event in schedule.iterrows():
            if 'test' not in event['EventName'].lower() and event['RoundNumber'] > 0:
                first_race = event
                break
        
        if first_race is None:
            return jsonify([])
        
        session = fastf1.get_session(year, first_race['RoundNumber'], 'R')
        session.load(telemetry=False, weather=False, messages=False)
        
        drivers = []
        for drv in session.drivers:
            driver_info = session.get_driver(drv)
            drivers.append({
                'id': int(drv),
                'number': int(drv),
                'name': driver_info['FullName'],
                'team': driver_info['TeamName'],
                'country': driver_info['CountryCode'],
                'abbreviation': driver_info['Abbreviation'],
                'image': driver_info.get('HeadshotUrl', ''),
                'points': ' '  # FastF1 doesn't provide standings
            })
        return jsonify(drivers)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ============ RACE DETAILS ============
@app.route('/api/race/<int:year>/<int:round_num>')
def get_race(year, round_num):
    try:
        session = fastf1.get_session(year, round_num, 'R')
        session.load(telemetry=False, weather=False, messages=False)
        
        event = session.event
        results = session.results
        
        # Get top 3 finishers
        podium = []
        for idx, row in results.head(3).iterrows():
            podium.append({
                'position': int(row['Position']) if pd.notna(row['Position']) else 0,
                'driver': row['FullName'],
                'team': row['TeamName'],
                'time': str(row['Time']) if pd.notna(row['Time']) else 'N/A'
            })
        
        return jsonify({
            'id': round_num,
            'round': round_num,
            'name': event['EventName'],
            'country': event['Country'],
            'circuit': event['Location'],
            'date': str(event['EventDate'])[:10],
            'podium': podium,
            'totalLaps': int(session.total_laps) if hasattr(session, 'total_laps') else 0,
            'lapRecord': ' ',
            'trivia': ' ',
            'videoId': ' '
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ============ TELEMETRY ============
@app.route('/api/telemetry/<int:year>/<int:round_num>/<driver_id>')
def get_telemetry(year, round_num, driver_id):
    try:
        session = fastf1.get_session(year, round_num, 'R')
        session.load(telemetry=True, weather=False, messages=False)
        
        # Get driver's fastest lap
        driver_laps = session.laps.pick_driver(driver_id.upper())
        fastest_lap = driver_laps.pick_fastest()
        
        if fastest_lap is None or fastest_lap.empty:
            return jsonify({"error": "No lap data found"}), 404
        
        telemetry = fastest_lap.get_telemetry()
        
        # Sample telemetry to reduce data size (every 10th point)
        telemetry_sampled = telemetry.iloc[::10]
        
        data = {
            'driver': driver_id.upper(),
            'lapTime': str(fastest_lap['LapTime']),
            'lapNumber': int(fastest_lap['LapNumber']) if pd.notna(fastest_lap['LapNumber']) else 0,
            'telemetry': {
                'speed': telemetry_sampled['Speed'].tolist(),
                'throttle': telemetry_sampled['Throttle'].tolist(),
                'brake': telemetry_sampled['Brake'].astype(int).tolist(),
                'gear': telemetry_sampled['nGear'].tolist(),
                'rpm': telemetry_sampled['RPM'].tolist(),
                'drs': telemetry_sampled['DRS'].tolist(),
                'distance': telemetry_sampled['Distance'].tolist()
            }
        }
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ============ LIVE TIMING ============
@app.route('/api/live/timing')
def get_live_timing():
    try:
        # Note: FastF1 live timing requires an active session
        # This is a placeholder - actual implementation needs session monitoring
        return jsonify({
            "status": "no_active_session",
            "message": "Live timing is only available during active F1 sessions",
            "next_session": "Check schedule for upcoming sessions"
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=True)
