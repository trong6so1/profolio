#!/bin/bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

BUILD_ID="${BUILD_ID:-local}"

BUILD_DIR="/tmp/build_fullstack_${BUILD_ID}"
PACKAGE_FILE="${BUILD_DIR}.tar.gz"

export NEXT_TELEMETRY_DISABLED=1

echo "=========================================="
echo "🚀 START BUILD"
echo "=========================================="
echo "PROJECT_DIR: $PROJECT_DIR"
echo "BUILD_ID   : $BUILD_ID"
echo "BUILD_DIR  : $BUILD_DIR"
echo "PACKAGE    : $PACKAGE_FILE"
echo "=========================================="

cd "$PROJECT_DIR"

# ============================================================
# Check Bun
# ============================================================

if ! command -v bun >/dev/null 2>&1; then
    echo "❌ bun is not installed or not in PATH"
    echo ""
    echo "Install Bun:"
    echo "curl -fsSL https://bun.sh/install | bash"
    exit 1
fi

echo "✅ Bun: $(bun --version)"

# ============================================================
# Check package.json
# ============================================================

if [ ! -f "$PROJECT_DIR/package.json" ]; then
    echo "❌ package.json not found"
    exit 1
fi

# ============================================================
# Clean
# ============================================================

echo ""
echo "🧹 Cleaning old build..."

rm -rf "$BUILD_DIR"
rm -f "$PACKAGE_FILE"

mkdir -p "$BUILD_DIR"

# ============================================================
# Install dependencies
# ============================================================

echo ""
echo "=========================================="
echo "📦 Installing dependencies"
echo "=========================================="

if [ -f "$PROJECT_DIR/bun.lock" ]; then

    echo "Using bun.lock..."

    bun install --frozen-lockfile

elif [ -f "$PROJECT_DIR/bun.lockb" ]; then

    echo "Using bun.lockb..."

    bun install --frozen-lockfile

else

    echo "⚠️ Bun lock file not found"
    echo "Running bun install..."

    bun install

fi

# ============================================================
# Build Next.js
# ============================================================

echo ""
echo "=========================================="
echo "🔨 Building Next.js"
echo "=========================================="

bun run build

# ============================================================
# Check standalone
# ============================================================

if [ ! -f "$PROJECT_DIR/.next/standalone/server.js" ]; then

    echo "❌ Next.js standalone server.js not found"

    echo ""
    echo "Check next.config.js / next.config.ts:"
    echo ""
    echo "output: 'standalone'"
    echo ""

    exit 1
fi

# ============================================================
# Copy Next.js standalone
# ============================================================

echo ""
echo "📦 Copying Next.js standalone..."

mkdir -p "$BUILD_DIR/next-service-dist"

cp -R \
    "$PROJECT_DIR/.next/standalone/." \
    "$BUILD_DIR/next-service-dist/"

# ============================================================
# Copy static
# ============================================================

if [ -d "$PROJECT_DIR/.next/static" ]; then

    echo "📦 Copying .next/static..."

    mkdir -p "$BUILD_DIR/next-service-dist/.next"

    cp -R \
        "$PROJECT_DIR/.next/static" \
        "$BUILD_DIR/next-service-dist/.next/"

fi

# ============================================================
# Copy public
# ============================================================

if [ -d "$PROJECT_DIR/public" ]; then

    echo "📦 Copying public..."

    cp -R \
        "$PROJECT_DIR/public" \
        "$BUILD_DIR/next-service-dist/"

fi

# ============================================================
# Database
# ============================================================

if [ -f "$PROJECT_DIR/db/custom.db" ]; then

    echo ""
    echo "🗄️ Copying database..."

    mkdir -p "$BUILD_DIR/db"

    cp -R \
        "$PROJECT_DIR/db/." \
        "$BUILD_DIR/db/"

    echo "🗄️ Updating database schema..."

    DATABASE_URL="file:$BUILD_DIR/db/custom.db" \
        bun run db:push

else

    echo "⚠️ db/custom.db not found"

fi

# ============================================================
# Caddyfile
# ============================================================

if [ -f "$PROJECT_DIR/Caddyfile" ]; then

    echo ""
    echo "📦 Copying Caddyfile..."

    cp \
        "$PROJECT_DIR/Caddyfile" \
        "$BUILD_DIR/Caddyfile"

else

    echo "⚠️ Caddyfile not found"

fi

# ============================================================
# Start script
# ============================================================

echo ""
echo "📦 Copying start.sh..."

cp \
    "$SCRIPT_DIR/start.sh" \
    "$BUILD_DIR/start.sh"

chmod +x "$BUILD_DIR/start.sh"

# ============================================================
# mini-services
# ============================================================

if [ -d "$PROJECT_DIR/mini-services" ]; then

    echo ""
    echo "=========================================="
    echo "🔨 Building mini-services"
    echo "=========================================="

    if [ -f "$SCRIPT_DIR/mini-services-install.sh" ]; then
        bash "$SCRIPT_DIR/mini-services-install.sh"
    fi

    if [ -f "$SCRIPT_DIR/mini-services-build.sh" ]; then
        bash "$SCRIPT_DIR/mini-services-build.sh"
    fi

    if [ -f "$SCRIPT_DIR/mini-services-start.sh" ]; then

        cp \
            "$SCRIPT_DIR/mini-services-start.sh" \
            "$BUILD_DIR/mini-services-start.sh"

        chmod +x "$BUILD_DIR/mini-services-start.sh"

    fi

else

    echo "ℹ️ mini-services not found"

fi

# ============================================================
# Package
# ============================================================

echo ""
echo "=========================================="
echo "📦 Creating package"
echo "=========================================="

tar -czf \
    "$PACKAGE_FILE" \
    -C "$BUILD_DIR" \
    .

echo ""
echo "=========================================="
echo "✅ BUILD SUCCESS"
echo "=========================================="

ls -lh "$PACKAGE_FILE"

echo ""
echo "Artifact:"
echo "$PACKAGE_FILE"

echo "=========================================="