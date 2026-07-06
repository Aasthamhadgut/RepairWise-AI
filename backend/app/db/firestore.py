import os
from datetime import datetime, timezone

_db = None
_memory_reports = []


def get_db():
    global _db
    if _db:
        return _db

    credentials_path = os.getenv("FIREBASE_CREDENTIALS_PATH")
    if not credentials_path or not os.path.exists(credentials_path):
        return None

    try:
        import firebase_admin
        from firebase_admin import credentials, firestore
    except ImportError:
        return None

    if not firebase_admin._apps:
        cred = credentials.Certificate(credentials_path)
        firebase_admin.initialize_app(cred)

    _db = firestore.client()
    return _db


def save_report(report):
    report["createdAt"] = datetime.now(timezone.utc).isoformat()
    db = get_db()
    if not db:
        report_id = f"demo-{len(_memory_reports) + 1}"
        _memory_reports.append({"id": report_id, **report})
        return report_id

    ref = db.collection("reports").document()
    ref.set(report)
    return ref.id


def list_reports():
    db = get_db()
    if not db:
        return _memory_reports

    rows = []
    from firebase_admin import firestore

    for doc in db.collection("reports").order_by("createdAt", direction=firestore.Query.DESCENDING).limit(50).stream():
        rows.append({"id": doc.id, **doc.to_dict()})
    return rows


def get_report(report_id):
    db = get_db()
    if not db:
        return next((row for row in _memory_reports if row["id"] == report_id), None)

    doc = db.collection("reports").document(report_id).get()
    return {"id": doc.id, **doc.to_dict()} if doc.exists else None


def delete_report(report_id):
    db = get_db()
    if not db:
        _memory_reports[:] = [row for row in _memory_reports if row["id"] != report_id]
        return

    db.collection("reports").document(report_id).delete()
