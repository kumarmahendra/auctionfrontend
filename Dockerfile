FROM node:16-slim AS build
# WORKDIR /app
# COPY . .
# RUN yarn
# RUN yarn build

# # production environment
# FROM nginx:alpine

# # Remove the default Nginx static content
# RUN rm -rf /usr/share/nginx/html/*

# # Copy the build artifacts from the previous stage
# COPY --from=build /app/build /usr/share/nginx/html

# # Copy the Nginx configuration file
# COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# # Expose port 80
# EXPOSE 80

# # Command to run Nginx
# CMD ["nginx", "-g", "daemon off;"]

FROM node:16-slim AS build
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Build the app
RUN npm run build

# Install the serve package
RUN npm install -g serve

# Set the command to start the app
CMD ["serve", "-s", "build"]

# Expose port 5000
EXPOSE 5000