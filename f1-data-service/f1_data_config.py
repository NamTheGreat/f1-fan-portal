# =====================================================================
# 🎛️ F1 DATA CONFIGURATION
# =====================================================================
# Control where your data comes from: FastF1 API or this file.
#
# OPTIONS FOR 'source':
# - "api"    : Live data from FastF1 (ignores manual data)
# - "manual" : Only uses data defined below (ignores API)
# - "merge"  : Smart mix! Gets API data + Overrides specific fields from below
# =====================================================================

CONFIG = {
    # MASTER SWITCH: If False, forces everything to "manual" mode instantly (Emergency Offline Mode)
    "use_live_api": True,

    "overrides": {
        "schedule": "merge",      # RACES: "api", "manual", or "merge"
        "drivers": "merge",       # DRIVERS: "api", "manual", or "merge"
        "race_details": "merge",  # SPECIFIC RACE: "api", "manual", or "merge"
    },

    # =================================================================
    # 📝 MANUAL DATA STORE
    # =================================================================
    "manual_data": {
        
        # 🏎️ RACES (By Year)
        "schedule": {
            "2024": [
                {
                    "round": 1, 
                    # "name": "Bahrain GP", # Uncomment to override name
                    "lapRecord": "1:31.447 - Pedro de la Rosa (2005)",
                    "trivia": "First race of the season under lights.",
                    "videoId": "dQw4w9WgXcQ"
                },
                {
                    "round": 2,
                    "trivia": "Fastest street circuit in F1."
                }
            ],
            "2025": [
                # Add 2025 overrides here
            ]
        },

        # 🏁 DRIVERS (By Year)
        "drivers": {
            "2024": [
                {
                    "number": 1,
                    # "name": "Super Max", # Uncomment to override name
                    "points": " " 
                }
            ]
        }
    }
}
