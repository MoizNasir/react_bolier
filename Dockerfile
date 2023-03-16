# Builder
FROM node:16.13.1-alpine3.14 as builder

# Copy client and shared packages
WORKDIR /usr/src/____/
COPY .eslintrc .
COPY .eslintignore .
COPY package.json .
COPY tsconfig.json .
COPY pnpm-lock.yaml .
COPY VERSION .

COPY packages/client packages/client

# Install shared + client dependencies
RUN pnpm install --pure-lockfile --non-interactive

# Build shared packages
RUN pnpm build:shared

# Build client then
# WORKDIR /usr/src/____/packages/client
RUN pnpm build

# Runner
FROM nginx:alpine as runner

# Copy the nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the built static files to nginx + dictionaries
COPY --from=builder /usr/src/___/packages/client/dist /usr/share/nginx/html
