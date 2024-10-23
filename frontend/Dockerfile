# Stage 1: Build React app
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve the React app
FROM nginx:alpine

# Copy built files from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to access the frontend
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
