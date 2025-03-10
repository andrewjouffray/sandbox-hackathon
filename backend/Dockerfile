# Use Python 3.11 image
FROM python:3.11

# Set working directory
WORKDIR /app

# Install PostgreSQL client utilities
RUN apt-get update && apt-get install -y postgresql-client

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the app files
COPY . .

RUN chmod +x init-db.sh

# Expose the port
EXPOSE 5000

# Set environment variables for development mode
ENV FLASK_ENV=development
ENV FLASK_APP=app/main.py

# Run the Flask app
CMD ["/bin/bash", "-c", "./init-db.sh && gunicorn --reload -w 2 -b 0.0.0.0:5000 app.main:app"]