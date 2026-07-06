from app.ai.llm import run_json_prompt


def _fallback_decision(context):
    cost = context.get("cost", {})
    form = context.get("payload", {})
    repair_high = cost.get("repairCostHigh", 9000)
    replacement_low = cost.get("replacementCostLow", 35000)
    ratio = repair_high / replacement_low if replacement_low else 1
    diagnosis_probability = context.get("diagnosis", {}).get("probability", 0.65)
    if form.get("warrantyStatus") == "Under warranty":
        ratio = ratio * 0.65
    if form.get("condition") == "Poor":
        ratio = ratio * 1.18

    if ratio <= 0.35 and diagnosis_probability >= 0.65:
        recommendation = "Repair"
        repair_score = 88
        reasoning = "Repair is recommended because the likely repair cost is far below replacement cost and the fault pattern is diagnosable."
    elif ratio <= 0.55:
        recommendation = "Reuse"
        repair_score = 66
        reasoning = "Repair may be possible, but reuse, resale, or part replacement should be compared before spending more."
    elif ratio <= 0.75:
        recommendation = "Recycle"
        repair_score = 42
        reasoning = "Repair cost is becoming too close to replacement value, so certified recycling is more responsible if reuse is not possible."
    else:
        recommendation = "Replace"
        repair_score = 28
        reasoning = "Replacement is more practical because repair cost is high compared with replacement and long-term reliability may be poor."

    return {
        "recommendation": recommendation,
        "confidenceScore": round(min(0.92, 0.58 + diagnosis_probability / 3), 2),
        "repairScore": repair_score,
        "sustainabilityScore": 90 if recommendation in ["Repair", "Reuse"] else 74,
        "reasoning": reasoning,
        "costRatio": round(ratio, 2)
    }


def decision_agent(context):
    fallback = _fallback_decision(context)
    return run_json_prompt(
        "Choose one of Repair, Reuse, Recycle, Replace. Include confidence, repair score, sustainability score, and reasoning. Return JSON only.",
        context,
        fallback
    )
