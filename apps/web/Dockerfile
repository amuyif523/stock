# React/Vite Frontend PWA for Addis Profit Finder
# Local-First Architecture - Fedora Linux Compatible

FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY apps/web/package*.json ./

# Install dependencies
RUN npm ci && npm cache clean --force

# Copy source code
COPY apps/web/ ./

# Build the application
RUN npm run build

# Install serve for production serving (optional)
RUN npm install -g serve

# Expose port (Vite dev server uses 5173, production uses 3000)
EXPOSE 5173

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5173 || exit 1

# Start development server (for production, use: serve -s dist -l 5173)
CMD ["npm", "run", "dev"]
