#!/bin/bash

set -euo pipefail

# ============================================================
# Development startup script
# Used for LOCAL development
#
# Starts:
#   - Next.js dev server :3000
#   - mini-services
#
# Does NOT start Caddy
# ============================================================

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

DEV_PID=""
MINI_PIDS=()

# ------------------------------------------------------------
# Logging
# ------------------------------------------------------------

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*"
}

# ------------------------------------------------------------
# Cleanup
# ------------------------------------------------------------

cleanup() {

    echo ""
    echo "=========================================="
    echo "🛑 Stopping development services"
    echo "=========================================="

    if [ -n "${DEV_PID:-}" ]; then

        if kill -0 "$DEV_PID" >/dev/null 2>&1; then

            echo "Stopping Next.js PID: $DEV_PID"

            kill -TERM "$DEV_PID" >/dev/null 2>&1 || true

        fi

    fi

    for pid in "${MINI_PIDS[@]:-}"; do

        if kill -0 "$pid" >/dev/null 2>&1; then

            echo "Stopping mini-service PID: $pid"

            kill -TERM "$pid" >/dev/null 2>&1 || true

        fi

    done

    sleep 1

    if [ -n "${DEV_PID:-}" ]; then

        if kill -0 "$DEV_PID" >/dev/null 2>&1; then

            kill -KILL "$DEV_PID" >/dev/null 2>&1 || true

        fi

    fi

    for pid in "${MINI_PIDS[@]:-}"; do

        if kill -0 "$pid" >/dev/null 2>&1; then

            kill -KILL "$pid" >/dev/null 2>&1 || true

        fi

    done

    echo "✅ All development services stopped"
}

trap cleanup EXIT INT TERM

# ------------------------------------------------------------
# Validate Bun
# ------------------------------------------------------------

if ! command -v bun >/dev/null 2>&1; then

    echo "❌ bun is not installed or not in PATH"

    exit 1

fi

log "Bun version: $(bun --version)"

# ------------------------------------------------------------
# Go to project
# ------------------------------------------------------------

cd "$PROJECT_DIR"

echo ""
echo "=========================================="
echo "🚀 Starting development environment"
echo "=========================================="

echo "Project:"
echo "$PROJECT_DIR"

# ------------------------------------------------------------
# Install dependencies
# ------------------------------------------------------------

echo ""
echo "📦 Installing dependencies..."

if [ -f "bun.lock" ]; then

    bun install --frozen-lockfile

else

    bun install

fi

# ------------------------------------------------------------
# Database
# ------------------------------------------------------------

echo ""
echo "🗄️ Updating database..."

bun run db:push

# ------------------------------------------------------------
# Start Next.js
# ------------------------------------------------------------

echo ""
echo "=========================================="
echo "🚀 Starting Next.js development server"
echo "=========================================="

bun run dev > "$PROJECT_DIR/.zscripts/next-dev.log" 2>&1 &

DEV_PID=$!

echo "Next.js PID: $DEV_PID"

# ------------------------------------------------------------
# Wait for Next.js
# ------------------------------------------------------------

echo ""
echo "⏳ Waiting for Next.js..."

for i in $(seq 1 60); do

    if curl -fsS \
        --connect-timeout 2 \
        --max-time 5 \
        "http://localhost:3000" \
        >/dev/null 2>&1; then

        echo "✅ Next.js is ready"

        break

    fi

    if ! kill -0 "$DEV_PID" >/dev/null 2>&1; then

        echo "❌ Next.js process exited unexpectedly"

        echo ""
        echo "Last log:"
        tail -n 50 "$PROJECT_DIR/.zscripts/next-dev.log" || true

        exit 1

    fi

    echo "Waiting... $i/60"

    sleep 1

    if [ "$i" -eq 60 ]; then

        echo "❌ Next.js failed to start"

        exit 1

    fi

done

# ------------------------------------------------------------
# Health check
# ------------------------------------------------------------

echo ""
echo "🏥 Health check..."

curl -fsS \
    "http://localhost:3000" \
    >/dev/null

echo "✅ Next.js health check passed"

# ------------------------------------------------------------
# Start mini-services
# ------------------------------------------------------------

MINI_SERVICES_DIR="$PROJECT_DIR/mini-services"

if [ -d "$MINI_SERVICES_DIR" ]; then

    echo ""
    echo "=========================================="
    echo "🚀 Starting mini-services"
    echo "=========================================="

    for service_dir in "$MINI_SERVICES_DIR"/*; do

        [ -d "$service_dir" ] || continue

        service_name="$(basename "$service_dir")"

        if [ ! -f "$service_dir/package.json" ]; then

            echo "[$service_name] package.json not found, skipping"

            continue

        fi

        if ! grep -q '"dev"' "$service_dir/package.json"; then

            echo "[$service_name] dev script not found, skipping"

            continue

        fi

        echo "[$service_name] Installing dependencies..."

        (
            cd "$service_dir"

            bun install

            exec bun run dev

        ) > "$PROJECT_DIR/.zscripts/mini-service-${service_name}.log" 2>&1 &

        pid=$!

        MINI_PIDS+=("$pid")

        echo "[$service_name] Started PID: $pid"

    done

else

    echo "ℹ️ mini-services directory not found"

fi

# ------------------------------------------------------------
# Keep script alive
# ------------------------------------------------------------

echo ""
echo "=========================================="
echo "🎉 Development environment started"
echo "=========================================="

echo ""
echo "Next.js:"
echo "http://localhost:3000"

echo ""
echo "Press Ctrl+C to stop all services."
echo ""

wait "$DEV_PID"