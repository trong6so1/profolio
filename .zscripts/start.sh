#!/bin/bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

APP_DIR="$SCRIPT_DIR"
NEXT_DIR="$APP_DIR/next-service-dist"

NEXT_PID=""
MINI_PID=""
CADDY_PID=""

cleanup() {

    echo ""
    echo "🛑 Stopping application..."

    if [ -n "${CADDY_PID:-}" ]; then
        kill "$CADDY_PID" 2>/dev/null || true
    fi

    if [ -n "${MINI_PID:-}" ]; then
        kill "$MINI_PID" 2>/dev/null || true
    fi

    if [ -n "${NEXT_PID:-}" ]; then
        kill "$NEXT_PID" 2>/dev/null || true
    fi
}

trap cleanup EXIT INT TERM

cd "$APP_DIR"

# ============================================================
# Check Node
# ============================================================

if ! command -v node >/dev/null 2>&1; then
    echo "❌ node not found"
    exit 1
fi

echo "✅ Node: $(node --version)"

# ============================================================
# Check Bun
# ============================================================

if ! command -v bun >/dev/null 2>&1; then
    echo "❌ bun not found"
    exit 1
fi

echo "✅ Bun: $(bun --version)"

# ============================================================
# Check Caddy
# ============================================================

if ! command -v caddy >/dev/null 2>&1; then
    echo "❌ caddy not found"
    exit 1
fi

echo "✅ Caddy: $(caddy version)"

# ============================================================
# Environment
# ============================================================

export NODE_ENV="${NODE_ENV:-production}"
export PORT="${PORT:-3000}"
export HOSTNAME="${HOSTNAME:-0.0.0.0}"
export NEXT_TELEMETRY_DISABLED=1

if [ -f "$APP_DIR/db/custom.db" ]; then
    export DATABASE_URL="${DATABASE_URL:-file:$APP_DIR/db/custom.db}"
fi

# ============================================================
# Validate Next.js
# ============================================================

if [ ! -f "$NEXT_DIR/server.js" ]; then

    echo "❌ Next.js server.js not found:"
    echo "$NEXT_DIR/server.js"

    exit 1
fi

# ============================================================
# Start Next.js
# ============================================================

echo ""
echo "🚀 Starting Next.js..."

cd "$NEXT_DIR"

node server.js \
    > "$APP_DIR/next.log" 2>&1 &

NEXT_PID=$!

cd "$APP_DIR"

echo "Next.js PID: $NEXT_PID"

# ============================================================
# Wait Next.js
# ============================================================

echo "⏳ Waiting for Next.js..."

for i in $(seq 1 60); do

    if curl -fsS \
        "http://127.0.0.1:${PORT}" \
        >/dev/null 2>&1; then

        echo "✅ Next.js is ready"
        break

    fi

    if ! kill -0 "$NEXT_PID" 2>/dev/null; then

        echo "❌ Next.js stopped"

        cat "$APP_DIR/next.log" || true

        exit 1

    fi

    sleep 1

    if [ "$i" -eq 60 ]; then

        echo "❌ Next.js startup timeout"

        cat "$APP_DIR/next.log" || true

        exit 1

    fi

done

# ============================================================
# Start mini-services
# ============================================================

if [ -f "$APP_DIR/mini-services-start.sh" ]; then

    echo ""
    echo "🚀 Starting mini-services..."

    bash "$APP_DIR/mini-services-start.sh" \
        > "$APP_DIR/mini-services.log" 2>&1 &

    MINI_PID=$!

    echo "Mini-services PID: $MINI_PID"

else

    echo "ℹ️ mini-services-start.sh not found"

fi

# ============================================================
# Caddy
# ============================================================

if [ ! -f "$APP_DIR/Caddyfile" ]; then

    echo "⚠️ Caddyfile not found"

    wait "$NEXT_PID"

    exit 0

fi

echo ""
echo "🔍 Validating Caddy..."

caddy validate \
    --config "$APP_DIR/Caddyfile" \
    --adapter caddyfile

echo ""
echo "🚀 Starting Caddy..."

caddy run \
    --config "$APP_DIR/Caddyfile" \
    --adapter caddyfile \
    > "$APP_DIR/caddy.log" 2>&1 &

CADDY_PID=$!

sleep 2

if ! kill -0 "$CADDY_PID" 2>/dev/null; then

    echo "❌ Caddy failed"

    cat "$APP_DIR/caddy.log" || true

    exit 1

fi

echo ""
echo "=========================================="
echo "🎉 APPLICATION STARTED"
echo "=========================================="
echo ""
echo "Next.js : http://localhost:${PORT}"
echo "Caddy   : http://localhost:81"
echo ""
echo "Next log       : $APP_DIR/next.log"
echo "Caddy log      : $APP_DIR/caddy.log"
echo "Mini-services  : $APP_DIR/mini-services.log"
echo "=========================================="

# ============================================================
# Keep alive
# ============================================================

while true; do

    if ! kill -0 "$NEXT_PID" 2>/dev/null; then
        echo "❌ Next.js stopped"
        exit 1
    fi

    if ! kill -0 "$CADDY_PID" 2>/dev/null; then
        echo "❌ Caddy stopped"
        exit 1
    fi

    sleep 5

done