from app.ai.llm import run_json_prompt


RECYCLING_LIBRARY = {
    "phone": {
        "safeDisposal": "Remove SIM and memory cards, back up and factory reset the phone, then hand it to an authorized e-waste collector.",
        "environmentalPrecautions": "Do not break the battery or screen. Lithium batteries can catch fire if punctured."
    },
    "laptop": {
        "safeDisposal": "Remove personal data, detach removable batteries if possible, and submit the laptop to an authorized e-waste recycler.",
        "environmentalPrecautions": "Keep batteries separate, avoid informal dismantling, and ask for responsible recycling confirmation."
    },
    "washing machine": {
        "safeDisposal": "Contact an appliance recycler or brand take-back partner. Reusable motor, drum, and metal parts should be recovered.",
        "environmentalPrecautions": "Drain water, disconnect power safely, and avoid dumping metal/plastic parts in open areas."
    },
    "refrigerator": {
        "safeDisposal": "Use a certified appliance recycler because refrigerant gas and compressor oil need controlled handling.",
        "environmentalPrecautions": "Do not cut cooling pipes. Refrigerant release can harm the environment."
    }
}


def _fallback_recycling(context):
    product = context.get("understanding", {}).get("product", "product").lower()
    key = next((item for item in RECYCLING_LIBRARY if item in product), "laptop")
    guide = RECYCLING_LIBRARY[key]
    return {
        **guide,
        "nearestRecyclingOption": "Search for authorized e-waste collection center, municipal recycling facility, or brand take-back point near your city.",
        "recyclingChecklist": [
            "Remove personal data and accessories",
            "Separate batteries if removable",
            "Request a recycling receipt or confirmation",
            "Never burn, crush, or dump the product"
        ]
    }


def recycling_agent(context):
    fallback = _fallback_recycling(context)
    return run_json_prompt(
        "Explain safe disposal, nearest recycling option placeholder, and environmental precautions. Return JSON only.",
        context,
        fallback
    )
