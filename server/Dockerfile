# Use an official lightweight Node.js image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package files first for efficient caching
COPY package*.json ./

# Install dependencies (including nodemon if ever needed)
RUN npm install

# Copy the rest of the server code
COPY . .

# Ensure uploads directory exists
RUN mkdir -p public/assets

# Expose your backend port
EXPOSE 3001

# Start the server using the production start command
CMD ["npm", "start"]
