from app.ai.llm import run_json_prompt


def eco_tips_agent(context):
    fallback = {
        "maintenanceTips": [
            "Clean and inspect the product regularly.",
            "Use the original charger or approved replacement parts.",
            "Fix small issues early to avoid larger failures."
        ],
        "energySavingTips": [
            "Switch off the product when not in use.",
            "Use power-saving settings where available."
        ],
        "lifeExtensionAdvice": "Schedule preventive maintenance every 6 to 12 months."
    }
    return run_json_prompt(
        "Generate maintenance tips, energy saving tips, and product life extension advice. Return JSON only.",
        context,
        fallback
    )
