# Use the official Node.js image.
FROM node:lts

# Create and change to the app directory.
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port 3000 and start the application
EXPOSE 3000
CMD ["npm", "start"]
