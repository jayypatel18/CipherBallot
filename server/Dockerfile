FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
RUN chmod +x init_db_docker.sh

# Ensure SQLite has proper permissions
RUN mkdir -p /data
ENV SQLITE_DB_PATH=/data/voting.db
RUN touch $SQLITE_DB_PATH && chmod 666 $SQLITE_DB_PATH

EXPOSE 5001

ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV PYTHONPATH=/app

ENTRYPOINT ["./init_db_docker.sh"]
CMD ["gunicorn", "--bind", "0.0.0.0:5001", "app:application"]