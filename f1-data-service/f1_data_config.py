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
        
        # =================================================================
        # 🏎️ RACES (By Year)
        # =================================================================
        # Copy the template below to override any race. 
        # Match the 'round' number to the official calendar.
        "schedule": {
            "2024": [
                {
                    "round": 1, 
                    "lapRecord": "1:31.447 - Pedro de la Rosa (2005)",
                    "trivia": "First race of the season under lights.",
                    "videoId": "https://www.youtube.com/watch?v=9Y5wMpKXNK4"
                    # "name": "Bahrain Grand Prix",
                    # "circuit": "Bahrain International Circuit",
                    # "country": "Bahrain",
                    # "date": "2024-03-02",
                    # "format": "conventional"
                },
                # {
                #     "round": 2, # Saudi Arabia
                #     "lapRecord": "",
                #     "trivia": "",
                #     "videoId": ""
                # }
            ],
            "2025": [
                # {
                #     "round": 1, # Australia
                #     "lapRecord": "1:20.260 - Charles Leclerc (2022)",
                #     "trivia": "Season opener returns to Albert Park.",
                #     "videoId": "",
                #     "name": "Australian Grand Prix",
                #     "circuit": "Albert Park Circuit",
                #     "date": "2025-03-16"
                # }
            ],
            "2026": [
                # {
                #     "round": 1, 
                #     "lapRecord": "",
                #     "trivia": "New engine regulations era.",
                #     "videoId": "",
                #     "name": "",
                #     "circuit": "",
                #     "date": ""
                # }
            ]
        },

        # =================================================================
        # 🏁 DRIVERS (By Year)
        # =================================================================
        # Match 'number' to the driver's racing number (e.g., 1 for Max, 44 for Lewis)
        "drivers": {
            "2024": [
                {
                    "number": 1,
                    # "name": "Max Verstappen",
                    # "team": "Red Bull Racing",
                    # "country": "NED",
                    # "image": "https://media.formula1.com/d_driver_fallback_image.png/...",
                    "points": " " 
                },
                # {
                #    "number": 44,
                #    "name": "Lewis Hamilton",
                #    "team": "Mercedes", 
                #    "points": " "
                # }
            ],
            "2025": [
                # {
                #    "number": 44,
                #    "name": "Lewis Hamilton",
                #    "team": "Ferrari", # He moves to Ferrari in 2025!
                #    "points": " ",
                #    "image": ""
                # },
                # {
                #    "number": 55,
                #    "name": "Carlos Sainz",
                #    "team": "Williams",
                #    "points": " "
                # }
            ],
            "2026": [
                # {
                #    "number": 1,
                #    "name": "",
                #    "team": "",
                #    "points": " "
                # }
            ]
        }
    }
}
