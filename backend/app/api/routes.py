from flask import Blueprint, jsonify, request

from app.ai.workflow import analyze_product
from app.db.firestore import delete_report, get_report, list_reports, save_report

api = Blueprint("api", __name__)


@api.post("/analyze")
def analyze():
    payload = request.get_json(silent=True) or {}
    if not payload.get("category") or not payload.get("problemDescription"):
        return jsonify({"error": "Product category and problem description are required."}), 400

    report = analyze_product(payload)
    saved_id = save_report(report)
    report["id"] = saved_id or "demo-report"
    return jsonify({"report": report})


@api.post("/login")
def login():
    return jsonify({"message": "Firebase Authentication is handled by the frontend SDK."})


@api.post("/register")
def register():
    return jsonify({"message": "Firebase Authentication is handled by the frontend SDK."})


@api.get("/reports")
def reports():
    return jsonify({"reports": list_reports()})


@api.get("/report/<report_id>")
def report(report_id):
    row = get_report(report_id)
    if not row:
        return jsonify({"error": "Report not found."}), 404
    return jsonify(row)


@api.delete("/report/<report_id>")
def remove_report(report_id):
    delete_report(report_id)
    return jsonify({"deleted": True})


@api.get("/ecoTips")
def eco_tips():
    return jsonify({
        "tips": [
            "Clean vents and filters monthly to improve product life.",
            "Repair high-value electronics when the repair cost is below 40% of replacement.",
            "Recycle batteries through certified e-waste collection points."
        ]
    })


@api.get("/recyclingGuide")
def recycling_guide():
    query = request.args.get("query", "product").title()
    return jsonify({
        "product": query,
        "safeDisposalMethod": f"Keep {query} separate from general waste. Remove data, batteries, and accessories where possible, then use an authorized recycler or brand take-back center.",
        "governmentGuidelines": "Follow local municipal rules and Indian e-waste handling guidelines. Prefer authorized e-waste collection centers over informal scrap disposal.",
        "tips": [
            "Check whether the item can be repaired, donated, or reused first.",
            "Remove personal data and account locks before disposal.",
            "Separate batteries, chargers, and accessories when possible.",
            "Ask the recycler for a receipt or responsible processing confirmation.",
            "Do not burn, crush, or throw electronics into mixed household waste."
        ]
    })
