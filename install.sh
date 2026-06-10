#!/bin/bash
# RMESH Installer
# Usage: curl -sSL https://raw.githubusercontent.com/ragna999/rmesh/main/install.sh | bash

set -euo pipefail

echo "🕸️  RMESH Installer"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 not found."
    echo "   Install: https://www.python.org/downloads/"
    exit 1
fi
echo "✅ Python 3 found"

# Check/Install Foundry
if ! command -v cast &> /dev/null; then
    echo "⚠️  Foundry (cast) not found. Installing..."
    curl -L https://foundry.paradigm.xyz | bash
    export PATH="$HOME/.foundry/bin:$PATH"
    foundryup
    echo "✅ Foundry installed"
else
    echo "✅ Foundry found"
fi

# Install RMESH
echo "📦 Installing RMESH..."
python3 -m pip install --upgrade pip
python3 -m pip install rmesh

echo ""
echo "✅ RMESH installed!"
echo ""
echo "Usage:"
echo "  rmesh status"
echo "  rmesh resolve @0xdeployer"
echo "  rmesh ask \"What is Base?\""
echo "  rmesh feed feed-rmesh"
echo ""
echo "If 'rmesh' command not found, add to PATH:"
echo "  export PATH=\"\$HOME/.local/bin:\$PATH\""
echo ""
echo "Docs: https://github.com/ragna999/rmesh"
