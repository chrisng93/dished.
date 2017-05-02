# Use current version of node
FROM node:latest

MAINTAINER Chris Ng, chris.ng93@gmail.com

RUN npm install webpack -g

# Create app directory
RUN mkdir -p /usr/src/dished.-frontend
WORKDIR /usr/src/dished.-frontend

# Install dependencies
COPY package.json /usr/src/dished.-frontend
RUN npm install

# Copy app source
COPY . /usr/src/dished.-frontend/

# Expose port
EXPOSE 3001

# Build and run app
RUN webpack -p --config webpack.production.config.js --progress --profile --colors
CMD npm start
