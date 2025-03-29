# Base image
FROM node:18-alpine AS base

# Set the working directory
WORKDIR /home/node/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Change ownership to the node user
RUN chown -R node:node /home/node/app

# Switch to node user
USER node

# Copy remaining files
COPY --chown=node:node . .

EXPOSE 3000

# Start the server with nodemon
CMD ["npx", "nodemon", "server.js"]