#!/bin/bash

# Get the EC2 public IP
EC2_PUBLIC_IP=54.161.56.106

# Create production .env with correct IP
echo "Creating production environment files"
echo "VITE_URL=http://$EC2_PUBLIC_IP:5001" > ./client/.env.production

# Export IP for docker-compose
export API_URL=http://$EC2_PUBLIC_IP:5001

# Build and start services
docker-compose -f docker-compose.prod.yml up -d --build