# RepairWise AI

RepairWise AI is a production-ready starter project for an SDG 12 web platform that helps users decide whether a product should be repaired, reused, recycled, or replaced.

## Stack

- Frontend: React, Vite, Tailwind CSS, Framer Motion, React Router, Axios
- Backend: Python Flask
- Database: Firebase Firestore
- Authentication: Local email login for the frontend
- AI: Hugging Face Inference API agent orchestration
- Deployment: Vercel frontend, Render backend

## Milestones

See [MILESTONES.md](./MILESTONES.md) for the full delivery plan.

## Quick Start

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
python run.py
```

`requirements.txt` starts the demo backend quickly. For production Firebase Admin, Hugging Face, and Render/Gunicorn support, install `requirements-production.txt`.

### Frontend

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

The app will work in demo mode without API keys. Add Hugging Face values for live AI analysis and Firebase Admin values only if you want backend Firestore report storage.

## Login Behavior

All website pages are protected. Users must login or register before accessing the dashboard, analyzer, reports, recycling guide, or learning center. Login/register uses local browser storage, so no Firebase API key or Google login is required.

## Environment

Frontend variables are in `frontend/.env.example`.
Backend variables are in `backend/.env.example`.

## Deployment

- Deploy `frontend` to Vercel.
- Deploy `backend` to Render.
- Set all environment variables in each platform dashboard.
- Configure Firebase Admin credentials only if backend Firestore storage is enabled.
