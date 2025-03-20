FROM node:23

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Use ARG to accept build-time variables
ARG VITE_URL=http://host.docker.internal:5001
ENV VITE_URL=${VITE_URL}

EXPOSE 3000

# Use exec form of CMD and ensure host is set to 0.0.0.0
CMD ["npm", "run", "start", "--", "--host", "0.0.0.0"]