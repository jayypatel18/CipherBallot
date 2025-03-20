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
# Ensure FLASK_APP points to the correct file
ENV FLASK_RUN_HOST=127.0.0.1
ENV PYTHONPATH=/app

# Run the Flask app using Gunicorn
CMD ["gunicorn", "--bind", "127.0.0.1:5001", "app:application"]