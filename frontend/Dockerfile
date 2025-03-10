# Step 1: Build the React app using a Node image
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json (if present)
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# Build the React app
RUN npm run build

# Step 2: Serve the app using a lightweight web server (e.g., Nginx)
FROM nginx:alpine

# Copy the build files to the Nginx server
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port that Nginx will serve the app on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
