# Base image
FROM nikolaik/python-nodejs:python3.11-nodejs18

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm ci --verbose

# Install slither
RUN pip3 install slither-analyzer

# Bundle app source
COPY . .
RUN npx prisma generate

# Install TRON solc dependencies
RUN cd ./compilers/tron && npm i

# Creates a "dist" folder with the production build
RUN npm run build

# Start the server using the production build
CMD [ "npm", "run", "start:prod" ]
