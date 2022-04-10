# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:14.16.1-alpine3.11 as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:stable

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/forecast-ui /usr/share/nginx/html

# Expose port 80
EXPOSE 80