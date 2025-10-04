# Use Node.js base image
FROM node:20

# Set working directory inside container
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the app code
COPY . .

# Expose port 5000 (or whatever your backend uses)
EXPOSE 5000

# Start the server
CMD ["npm", "start"]
