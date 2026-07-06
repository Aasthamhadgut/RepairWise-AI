from app.ai.llm import run_json_prompt


FAULT_LIBRARY = {
    "laptop": {
        "battery": ["Battery cell degradation", "Charging IC issue", "Background process or thermal drain"],
        "screen": ["Display panel damage", "Loose display flex cable", "GPU or display driver fault"],
        "heat": ["Dust-clogged cooling system", "Thermal paste degradation", "Fan bearing wear"],
        "default": ["Battery wear", "SSD/RAM connection issue", "Dust and thermal throttling"]
    },
    "phone": {
        "battery": ["Battery health degradation", "Charging port contamination", "Power management IC issue"],
        "screen": ["Display glass or OLED damage", "Touch digitizer fault", "Display connector issue"],
        "water": ["Moisture corrosion", "Shorted board component", "Speaker or charging port damage"],
        "default": ["Battery or charging fault", "Software corruption", "Display or button wear"]
    },
    "washing machine": {
        "noise": ["Drum bearing wear", "Unbalanced load sensor issue", "Loose motor mount"],
        "water": ["Drain pump blockage", "Inlet valve failure", "Door seal leakage"],
        "default": ["Drain pump problem", "Motor belt wear", "Control board fault"]
    },
    "refrigerator": {
        "cool": ["Compressor weakness", "Thermostat fault", "Gas leakage"],
        "noise": ["Compressor vibration", "Fan motor wear", "Condenser dust buildup"],
        "default": ["Thermostat issue", "Condenser coil blockage", "Door gasket leakage"]
    }
}


def _fallback_diagnosis(context):
    payload = context.get("payload", {})
    category = payload.get("category", "").lower()
    symptoms = payload.get("problemDescription", "").lower()
    matched = next((key for key in FAULT_LIBRARY if key in category), "laptop")
    library = FAULT_LIBRARY[matched]
    symptom_key = next((key for key in library if key != "default" and key in symptoms), "default")
    faults = library[symptom_key]
    return {
        "possibleFaults": faults,
        "technicalExplanation": f"The {matched} symptoms match common {symptom_key} related failure patterns. A technician should inspect the highest probability part first before replacing the whole product.",
        "probability": 0.78 if symptom_key != "default" else 0.64
    }


def diagnosis_agent(context):
    fallback = _fallback_diagnosis(context)
    return run_json_prompt(
        "Predict possible faults with probability and a plain technical explanation. Return JSON only.",
        context,
        fallback
    )
