@echo off
cd /d "%~dp0backend"
if not exist .venv python -m venv .venv
if not exist .env copy .env.example .env
.venv\Scripts\pip install -r requirements.txt
.venv\Scripts\python run.py
