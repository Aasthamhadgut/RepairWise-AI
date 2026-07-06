from app.ai.llm import run_json_prompt


BASE_COSTS = {
    "phone": (900, 4500, 12000, 85000),
    "laptop": (1500, 9000, 35000, 120000),
    "washing machine": (1200, 8500, 18000, 55000),
    "refrigerator": (1800, 12000, 22000, 80000),
    "headphones": (300, 1800, 1500, 15000),
    "battery": (150, 1200, 500, 6000)
}


def _rupee(value):
    return f"Rs. {value:,}"


def _fallback_cost(context):
    payload = context.get("understanding", {})
    form = context.get("payload", {})
    product = payload.get("product", "laptop").lower()
    age = str(payload.get("age", "0")).lower()
    key = next((item for item in BASE_COSTS if item in product), "laptop")
    low, high, replacement_low, replacement_high = BASE_COSTS[key]
    if any(term in age for term in ["5", "6", "7", "8", "old"]):
        low = int(low * 1.35)
        high = int(high * 1.45)
    if form.get("condition") == "Poor":
        low = int(low * 1.25)
        high = int(high * 1.35)
    if form.get("usageLevel") == "Heavy use":
        high = int(high * 1.2)
    difficulty = "High" if high > replacement_low * 0.45 else "Medium"
    return {
        "estimatedRepairCost": f"{_rupee(low)} - {_rupee(high)}",
        "estimatedReplacementCost": f"{_rupee(replacement_low)} - {_rupee(replacement_high)}",
        "repairCostLow": low,
        "repairCostHigh": high,
        "replacementCostLow": replacement_low,
        "replacementCostHigh": replacement_high,
        "repairTime": "Same day - 2 days" if key in ["phone", "headphones", "battery"] else "1 - 5 days",
        "repairDifficulty": difficulty
    }


def repair_cost_agent(context):
    fallback = _fallback_cost(context)
    return run_json_prompt(
        "Estimate repair cost and replacement cost in Indian rupees, repair time, and difficulty. Return JSON only.",
        context,
        fallback
    )
