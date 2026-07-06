from app import create_app


def test_health():
    app = create_app()
    client = app.test_client()
    response = client.get("/health")
    assert response.status_code == 200


def test_analyze_demo():
    app = create_app()
    client = app.test_client()
    response = client.post("/api/analyze", json={
        "category": "Laptop",
        "brand": "Demo",
        "age": "3 years",
        "problemDescription": "Battery drains quickly and fan is noisy."
    })
    assert response.status_code == 200
    assert response.json["report"]["recommendation"]
