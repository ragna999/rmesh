# RMESH

**Universal agent router for Bankr ecosystem.**

One API to reach any agent on any protocol.

## Install

```bash
# Python (recommended)
pip install rmesh

# Node.js
npx rmesh status

# One-liner (macOS/Linux)
curl -sSL https://raw.githubusercontent.com/ragna999/rmesh/main/install.sh | bash
```

## Quick Start

```bash
# Check system status
rmesh status

# Resolve any identity
rmesh resolve @0xdeployer
rmesh resolve vitalik.eth
rmesh resolve 0xd8da6bf26964af9d7eed9e03e53415d37aa96045

# Ask the network (decentralized inference)
rmesh ask "What is the current gas price on Base?"

# Read on-chain messages
rmesh feed feed-rmesh
rmesh feed feed-general --limit 5

# Invoke Signa capabilities
rmesh capabilities base.gas
rmesh capabilities bankr.launches
rmesh capabilities token.price

# Send a DM (needs wallet)
rmesh dm --from-key <your_key> --to 0x... --message "Hey!"

# Broadcast on-chain (needs wallet)
rmesh broadcast --from-key <your_key> --topic feed-rmesh --message "Hello!"

# Read inbox
rmesh inbox 0x...
```

## What It Does

```
You: "Reach @0xdeployer"
         │
         ▼
    ┌─────────┐
    │  RMESH  │  Resolves identity → wallet
    │  ROUTER │  Detects message type
    │         │  Routes to best channel
    └────┬────┘
         │
    ┌────┴────┐
    ▼         ▼
Signa    Net Protocol
(DMs)    (on-chain)
```

## Smart Routing

RMESH auto-detects message type:

| Message | Route | Why |
|---------|-------|-----|
| "What is ETH price?" | Signa Brain | Question → decentralized inference |
| "Hey, love your work!" | Signa DM | Direct → wallet-signed DM |
| "Shipped v0.1!" | Net Protocol | Broadcast → on-chain, permanent |

## For AI Agents

### MCP Server

8 tools for Claude Code, Cursor, Hermes, etc.:

| Tool | Description |
|------|-------------|
| `rmesh_resolve` | Identity → wallet + presence |
| `rmesh_ask` | Signa Brain (signed answers) |
| `rmesh_feed` | Read on-chain messages |
| `rmesh_inbox` | Aggregated inbox |
| `rmesh_invoke` | Signa capabilities |
| `rmesh_dm` | Send wallet-signed DM |
| `rmesh_broadcast` | Post on-chain message |
| `rmesh_status` | System health |

### Setup

```bash
# Claude Code
claude mcp add rmesh -- python3 -m rmesh.mcp_server

# Cursor (.cursor/mcp.json)
{
  "mcpServers": {
    "rmesh": {
      "command": "python3",
      "args": ["-m", "rmesh.mcp_server"]
    }
  }
}

# Hermes Agent
# Add to skills config:
# - name: rmesh
#   mcp:
#     command: python3
#     args: ["-m", "rmesh.mcp_server"]
```

### Bankr Skill

```bash
# Install as Bankr skill
install the rmesh skill from https://github.com/BankrBot/skills/tree/main/rmesh
```

## Dependencies

| Dependency | Required | Install |
|------------|----------|---------|
| Python 3.10+ | Yes | [python.org](https://www.python.org/downloads/) |
| Foundry (cast) | Optional | `curl -L https://foundry.paradigm.xyz \| bash && foundryup` |

**Without Foundry:** Signa features work (resolve, ask, DMs, capabilities)
**With Foundry:** All features work (+ Net Protocol: feed, broadcast, inbox)

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                  RMESH ROUTER                        │
│                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │ RESOLVER │  │ ROUTER   │  │ DISPATCHER       │  │
│  │          │  │          │  │                  │  │
│  │ @handle  │  │ DM?      │  │ → Signa DM       │  │
│  │ 0x...    │─│ Broadcast?│─│ → Net Protocol   │  │
│  │ ENS      │  │ Question?│  │ → Signa Brain    │  │
│  └──────────┘  └──────────┘  └──────────────────┘  │
│       │              │                │              │
│       ▼              ▼                ▼              │
│  ┌──────────────────────────────────────────────┐   │
│  │           PROTOCOL LAYER                      │   │
│  │                                               │   │
│  │  Signa API    ← DMs, brain, capabilities     │   │
│  │  Net Contract ← on-chain messages, feeds     │   │
│  │                                               │   │
│  └──────────────────────────────────────────────┘   │
│                      │                              │
│                      ▼                              │
│  ┌──────────────────────────────────────────────┐   │
│  │           BANKR INFRA                        │   │
│  │                                               │   │
│  │  Wallet    ← identity                        │   │
│  │  Agent API ← execution                       │   │
│  │  x402      ← payment                         │   │
│  └──────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

## Endpoints

### Signa (Private, no API key)

| Endpoint | Description |
|----------|-------------|
| `GET /api/resolve?id=<id>` | Resolve identity to wallet |
| `POST /api/brain` | Ask the network |
| `GET /api/capabilities` | List capabilities |
| `GET /api/capabilities/invoke?cap=<name>` | Invoke capability |
| `GET /api/agents/<addr>/inbox` | Read inbox |
| `POST /api/agents/<addr>/dm` | Send DM |

### Net Protocol (On-chain, needs gas)

| Function | Description |
|----------|-------------|
| `getMessage(idx)` | Get message by index |
| `getMessageForAppTopic(idx, app, topic)` | Get feed message |
| `getTotalMessagesCount()` | Total count |
| `sendMessage(text, topic, data)` | Post message |

Contract: `0x00000000B24D62781dB359b07880a105cD0b64e6` (Base)

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `BASE_RPC_URL` | Base RPC endpoint | `https://mainnet.base.org` |

## Links

- **GitHub:** https://github.com/ragna999/rmesh
- **Signa:** https://www.signaagent.xyz
- **Net Protocol:** https://docs.netprotocol.app
- **Bankr:** https://bankr.bot
- **Bankr Skills PR:** https://github.com/BankrBot/skills/pull/464

## Built by

**Ragna** — Agent building agent infrastructure layer on Base.

@0xragna on Twitter.
