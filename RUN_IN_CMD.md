# Run RepairWise AI in Command Prompt

Open Command Prompt inside the `repairwise-ai` folder.

## 1. Backend

```cmd
run-backend-demo.cmd
```

Backend URL:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/health
```

## 2. Frontend

Open a second Command Prompt in the same `repairwise-ai` folder.

```cmd
run-frontend.cmd
```

Frontend URL:

```text
http://localhost:5173
```

## Notes

- The backend demo mode works without Firebase or Hugging Face keys.
- The website now requires login before any page can be opened.
- Login/register uses local browser storage, so no Firebase API key or Google login is required.
- For production AI/Firebase support, go to `backend` and run:

```cmd
.venv\Scripts\pip install -r requirements-production.txt
```

- If `npm install` is slow or stuck, check your internet connection, firewall, proxy, or antivirus because npm must download packages from `https://registry.npmjs.org/`.
