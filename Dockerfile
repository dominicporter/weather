FROM node:alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm --only=prod install

# Bundle app source
COPY build /usr/src/app/build
COPY server.js /usr/src/app

EXPOSE 8080
CMD [ "npm", "start" ]
