from app.ai.llm import run_json_prompt


def product_understanding_agent(payload):
    fallback = {
        "product": payload.get("category", "Product"),
        "brand": payload.get("brand", "Unknown"),
        "model": payload.get("model", "Unknown"),
        "symptoms": payload.get("problemDescription", ""),
        "age": payload.get("age", "Unknown")
    }
    return run_json_prompt(
        "Extract product, brand, model, age, and symptoms. Return JSON only.",
        payload,
        fallback
    )
