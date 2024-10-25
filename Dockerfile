# Use an official Node.js runtime as a parent image (Node 18 to support newer packages)
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code into the container
COPY . .

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Define environment variable (optional, if your app depends on it)
ENV NODE_ENV=production

# Run the app when the container launches
CMD ["npm", "start"]
