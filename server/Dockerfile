# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Expose the port that your app will run on
EXPOSE 5001

# Set environment variables
ENV FLASK_APP=app.py
# Change this to bind to all interfaces
ENV FLASK_RUN_HOST=0.0.0.0
ENV PYTHONPATH=/app

# Change this to bind to all interfaces (0.0.0.0)
CMD ["gunicorn", "--bind", "0.0.0.0:5001", "app:application"]