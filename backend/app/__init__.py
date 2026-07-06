import os
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS

from app.api.routes import api


def create_app():
    load_dotenv()
    app = Flask(__name__)
    CORS(app, origins=[os.getenv("FRONTEND_URL", "http://localhost:5173")])
    app.register_blueprint(api, url_prefix="/api")

    @app.get("/health")
    def health():
        return {"status": "ok", "service": "repairwise-ai"}

    return app
