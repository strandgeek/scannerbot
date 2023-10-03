# Base image
FROM nikolaik/python-nodejs:python3.11-nodejs18

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install


# Install slither
RUN pip3 install slither-analyzer

# TODO: Remove it when TRON solc is fully functional to be replaced
RUN pip3 install py-solc

# TODO: Make available all versions
RUN solc-select install 0.5.10

# Bundle app source
COPY . .
RUN npx prisma generate

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
CMD [ "npm", "run", "start:prod" ]