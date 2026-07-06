def report_generator_agent(context):
    product = context["understanding"].get("product", "Product")
    diagnosis = context["diagnosis"]
    cost = context["cost"]
    decision = context["decision"]
    eco = context["eco"]
    recycling = context.get("recycling", {})
    cost_ratio = decision.get("costRatio", "N/A")

    return {
        "product": product,
        "recommendation": decision["recommendation"],
        "confidenceScore": decision["confidenceScore"],
        "repairScore": decision["repairScore"],
        "sustainabilityScore": decision["sustainabilityScore"],
        "reasoning": decision["reasoning"],
        "estimatedRepairCost": cost["estimatedRepairCost"],
        "estimatedReplacementCost": cost["estimatedReplacementCost"],
        "repairTime": cost["repairTime"],
        "repairDifficulty": cost["repairDifficulty"],
        "possibleFaults": diagnosis["possibleFaults"],
        "technicalExplanation": diagnosis["technicalExplanation"],
        "carbonFootprintSaved": "12 - 28 kg CO2e" if product.lower() in ["phone", "headphones"] else "25 - 95 kg CO2e",
        "moneySaved": f"Potential saving is based on the repair-to-replacement cost ratio of {cost_ratio}.",
        "environmentalImpact": "The recommendation considers repair cost, expected remaining life, e-waste risk, and avoided manufacturing emissions.",
        "accuracySignals": [
            f"Product identified as {product}",
            f"Diagnosis confidence: {diagnosis.get('probability', 'N/A')}",
            f"Cost ratio: {cost_ratio}",
            f"Warranty and age were included when provided"
        ],
        "maintenanceTips": eco["maintenanceTips"],
        "energySavingTips": eco["energySavingTips"],
        "lifeExtensionAdvice": eco["lifeExtensionAdvice"],
        "recycling": recycling
    }
