FROM node:18-alpine AS build-stage

# Set the working directory inside the container
WORKDIR /frontend

# Copy package.json and package-lock.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the files and build the application
COPY . .
RUN npm run build

# Use a lightweight Nginx image for the production environment
FROM nginx:stable-alpine AS production-stage

# Copy the build output from Vue to the Nginx public directory
COPY --from=build-stage /frontend/dist /usr/share/nginx/html

# Expose port 80 to make the app accessible
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]