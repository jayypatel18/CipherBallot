# Use an official Node.js runtime as a parent image
FROM node:23

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first to install dependencies
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Expose the port that React will run on
EXPOSE 3000

# Start the React app in development mode, listening on all interfaces (0.0.0.0)
CMD ["npm", "start", "--", "--host", "0.0.0.0"]