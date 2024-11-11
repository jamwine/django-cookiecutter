ARG NODE_VERSION=16.14-alpine

FROM node:${NODE_VERSION} as node

FROM node as client-local-build

ARG APP_HOME=/app

WORKDIR ${APP_HOME}

# Copy package.json and package-lock.json
COPY ./client/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY ./client ./

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]