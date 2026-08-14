FROM node:22-bookworm-slim

# ==========================================
# Install system dependencies + Caddy
# ==========================================

RUN apt-get update \
    && apt-get install -y \
        curl \
        unzip \
        ca-certificates \
        gnupg \
        debian-keyring \
        debian-archive-keyring \
        apt-transport-https \
    && rm -rf /var/lib/apt/lists/*


# ==========================================
# Install Caddy
# ==========================================

RUN curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' \
        | gpg --dearmor \
        -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg \
    && curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' \
        > /etc/apt/sources.list.d/caddy-stable.list \
    && apt-get update \
    && apt-get install -y caddy \
    && rm -rf /var/lib/apt/lists/*


# ==========================================
# Install Bun
# ==========================================

RUN curl -fsSL https://bun.sh/install | bash

ENV BUN_INSTALL=/root/.bun
ENV PATH=/root/.bun/bin:$PATH


# ==========================================
# Verify tools
# ==========================================

RUN node --version \
    && npm --version \
    && bun --version \
    && caddy version


# ==========================================
# Application
# ==========================================

WORKDIR /app


# ==========================================
# Copy dependency files
# ==========================================

COPY package.json ./
COPY bun.lock ./


# ==========================================
# Install dependencies
# ==========================================

RUN bun install --frozen-lockfile


# ==========================================
# Copy source
# ==========================================

COPY . .


# ==========================================
# Copy Caddy configuration
# ==========================================

COPY Caddyfile /etc/caddy/Caddyfile


# ==========================================
# Next.js build
# ==========================================

ENV NEXT_TELEMETRY_DISABLED=1

RUN bun run build


# ==========================================
# Runtime
# ==========================================

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=127.0.0.1

EXPOSE 81


# ==========================================
# Start Next.js + Caddy
# ==========================================

CMD ["sh", "-c", "node .next/standalone/server.js & exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile"]