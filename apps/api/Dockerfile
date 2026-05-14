# Node.js/Express API for Addis Profit Finder
# Local-First Architecture - Fedora Linux Compatible

FROM node:20-alpine

WORKDIR /app

# Install dependencies for sharp (image processing)
RUN apk add --no-cache vips-dev

# Copy package files
COPY apps/api/package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY apps/api/ ./

# Generate Prisma Client
RUN npx prisma generate

# Expose API port
EXPOSE 4000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:4000/health || exit 1

# Start the application
CMD ["npm", "start"]
