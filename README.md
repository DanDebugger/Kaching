# 🎵 KaChing
**Hear the savings. Split with purpose.**

*Real-time remittance fee optimizer + auto-budgeting pockets for Filipino OFWs, powered by Stellar.*

[![Built with Stellar](https://img.shields.io/badge/Built_with-Stellar-000000?style=for-the-badge&logo=stellar&logoColor=white)](https://stellar.org)
[![Powered by Soroban](https://img.shields.io/badge/Smart_Contracts-Soroban-7B62BA?style=for-the-badge)](https://soroban.stellar.org)

## 🎯 The Problem
Philippine remittances hit **$35.63B** in 2025, yet 43% of OFWs cite hidden or excessive fees as their top financial frustration. The newly passed *OFW Remittance Protection Act* mandates fee transparency and proposes a 2% cap—but workers lack tools to compare routes or verify compliance.

On the receiving end, families struggle to allocate irregular inflows toward specific goals (tuition, medical, emergency savings). Cash leakage and poor budgeting mean remittances rarely translate to long-term stability.

## 💡 The KaChing Solution
KaChing solves both ends of the flow. Optimize fees before sending. Auto-split funds into purpose-driven pockets on arrival. 

- **📥 Set & Split:** Sender enters amount + destination + auto-split rules (e.g., 50% Tuition | 30% Savings | 20% Medical).
- **🔍 Compare & Optimize:** KaChing queries Stellar anchors, calculates total costs, enforces 2% compliance caps, and ranks routes by price + speed.
- **🚀 Send:** One-click connects Freighter, builds a Horizon USDC transfer to the selected anchor, and signs locally.
- **🔊 Ka-Ching!:** Web Audio plays a subtle savings chime when a route beats average fees by ≥5%.
- **🧩 Auto-Split on Arrival:** Soroban smart contract logic handles routing funds into labeled Stellar "pockets".

## ⚙️ Technical Architecture
| Layer | Implementation |
|-------|----------------|
| **Frontend** | React 19, Tailwind CSS v4, Framer Motion |
| **Wallet** | `@stellar/freighter-api` (non-custodial, testnet-ready) |
| **Transactions (Planned)** | `@stellar/stellar-sdk` + Horizon API for asset routing |
| **Quotes (Mock)** | Local SEP-31 anchor quote API simulation |
| **Split Logic (Planned)** | Soroban contract: `% routing` → 3 destination addresses |
| **Audio** | Native Web Audio API (`src/utils/audio.ts`) |

## 🚀 Getting Started (Boilerplate)

1. Clone this repository
2. Install dependencies:
```bash
cd frontend
npm install
```
3. Run the development server:
```bash
npm run dev
```


## 🎶 The "Ka-Ching" Philosophy
Our name is our brand. The Ka-Ching sound is mathematically synthesized via the Web Audio API without needing external MP3 dependencies. Every time it plays, it reinforces a moment of financial optimization for the user.

---
*Built for the 2026 Stellar Hackathon.*
# Kaching
