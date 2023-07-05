# syntax=docker/dockerfile:1
# BASE STAGE
FROM node:18-alpine AS base

# Set the working dir
WORKDIR /app

# Copy package files for caching
COPY package*.json . 

## PRODUCTION STAGE
FROM base AS production
ENV NODE_ENV=production
RUN npm install --production
COPY . .
CMD ["npm", "run", "build"] 
CMD ["npm", "run", "preview"]

## DEVELOPMENT STAGE
FROM base AS dev
ENV NODE_ENV=development
RUN npm install 
COPY . .
CMD ["npm", "run", "dev"]
