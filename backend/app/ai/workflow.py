from app.ai.agents.decision import decision_agent
from app.ai.agents.diagnosis import diagnosis_agent
from app.ai.agents.eco_tips import eco_tips_agent
from app.ai.agents.product_understanding import product_understanding_agent
from app.ai.agents.recycling import recycling_agent
from app.ai.agents.repair_cost import repair_cost_agent
from app.ai.agents.report_generator import report_generator_agent


def analyze_product(payload):
    understanding = product_understanding_agent(payload)
    diagnosis = diagnosis_agent({"payload": payload, "understanding": understanding})
    cost = repair_cost_agent({"payload": payload, "understanding": understanding, "diagnosis": diagnosis})
    decision = decision_agent({"payload": payload, "understanding": understanding, "diagnosis": diagnosis, "cost": cost})
    recycling = {}

    if decision.get("recommendation") not in ["Repair", "Reuse"]:
        recycling = recycling_agent({"understanding": understanding, "diagnosis": diagnosis, "decision": decision})

    eco = eco_tips_agent({"understanding": understanding, "diagnosis": diagnosis, "decision": decision})

    return report_generator_agent({
        "understanding": understanding,
        "diagnosis": diagnosis,
        "cost": cost,
        "decision": decision,
        "recycling": recycling,
        "eco": eco
    })
