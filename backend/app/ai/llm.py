import os
import json


def _extract_json(text):
    text = text.strip()
    if text.startswith("```"):
        text = text.strip("`").strip()
        if text.lower().startswith("json"):
            text = text[4:].strip()
    start = text.find("{")
    end = text.rfind("}")
    if start != -1 and end != -1:
        text = text[start:end + 1]
    return json.loads(text)


def run_json_prompt(system_prompt, payload, fallback):
    api_key = (
        os.getenv("HUGGINGFACE_API_KEY")
        or os.getenv("HF_TOKEN")
        or os.getenv("HUGGINGFACEHUB_API_TOKEN")
    )
    if not api_key:
        return fallback

    try:
        from huggingface_hub import InferenceClient

        client = InferenceClient(token=api_key)
        response = client.chat_completion(
            model=os.getenv("HUGGINGFACE_MODEL", "mistralai/Mistral-7B-Instruct-v0.3"),
            messages=[
                {"role": "system", "content": system_prompt + " Respond with valid JSON only."},
                {"role": "user", "content": json.dumps(payload)}
            ],
            temperature=0.2,
            max_tokens=900
        )
        return _extract_json(response.choices[0].message.content)
    except Exception:
        return fallback
