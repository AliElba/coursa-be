# ----------- Stage 1: Build the application -----------
# Use an official Node.js image as the build environment
FROM node:20-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm install --production=false

# Copy the rest of the application code
COPY . .

# Build the NestJS application (outputs to dist/)
RUN npm run build

# ----------- Stage 2: Production image -----------
# Use a smaller Node.js image for the final container
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# If using Prisma, generate the client (safe to run even if not using Prisma)
RUN npx prisma generate || true

# Set environment variable for production
ENV NODE_ENV=production

# Expose the port your NestJS app runs on (default: 3000)
EXPOSE 3000

# Start the NestJS application
CMD ["node", "dist/src/main.js"]

# -----------
# Notes:
# - This Dockerfile uses multi-stage builds for smaller final images.
# - Prisma client is generated in the production image for runtime compatibility.
# - Adjust the CMD if your main file is in a different location.
# - Set environment variables (e.g., DATABASE_URL, JWT_SECRET) in Northflank UI. 