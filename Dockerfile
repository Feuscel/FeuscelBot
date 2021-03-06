FROM node:latest

# Create the directory
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

# Copy and Install
COPY package.json /usr/src/bot
RUN npm install

COPY . /usr/src/bot

# Command to start the bot
CMD ["node", "index.js"]