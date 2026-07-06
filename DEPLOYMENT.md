# Deployment Guide

## Vercel Frontend

1. Import the `frontend` directory into Vercel.
2. Set build command to `npm run build`.
3. Set output directory to `dist`.
4. Add `VITE_API_URL`.

## Render Backend

1. Create a new Web Service from the `backend` directory.
2. Build command: `pip install -r requirements-production.txt`
3. Start command: `gunicorn run:app`
4. Add `HUGGINGFACE_API_KEY`, `HUGGINGFACE_MODEL`, `FRONTEND_URL`, and Firebase service account configuration if Firestore storage is enabled.

## Firebase

1. Create Firestore database if you want backend report storage.
2. Download a service account JSON file for the Flask backend.
3. Set `FIREBASE_CREDENTIALS_PATH` or the service account environment variables expected by your deployment.
