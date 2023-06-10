# Dockerfile for the backend
FROM python:3.10.11 as backend
WORKDIR /app/backend/
COPY ./backend/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "backend/backend_deu_project/manage.py", "runserver", "0.0.0.0:8000"]