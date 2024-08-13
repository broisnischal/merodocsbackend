# syntax = docker/dockerfile:1

# Adjust BUN_VERSION as desired
# ARG BUN_VERSION=1.0.0
FROM oven/bun as base

LABEL fly_launch_runtime="Bun"

# Bun app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"
ENV PORT="3000"
ENV DRIZZLE_DATABASE_URL="postgresql://neondb_owner:HvQ8UyEab0jq@ep-still-bush-a5e3y5t2.us-east-2.aws.neon.tech/neondb?sslmode=require"

# ENV DATABASE_URL=""

# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y build-essential pkg-config python-is-python3

# Install node modules
COPY --link bun.lockb package.json ./
RUN bun install --ci

# Copy application code
COPY --link . .

# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "bun", "run", "dev" ]