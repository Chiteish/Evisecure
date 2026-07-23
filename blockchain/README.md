# EviSecure Blockchain Module

A **private, permissioned blockchain** for immutable digital evidence management — no cryptocurrency, no MetaMask, no public chain.

## What This Does

| Feature | Detail |
|---------|--------|
| 🔒 Immutable Logs | Every evidence action (upload, view, verify…) is written as a block |
| 🔗 Cryptographic Chaining | Each block contains the SHA-256 hash of the previous block |
| 🌳 Merkle Root | Each block contains a Merkle root of its evidence data |
| ✍️ Block Signing | Blocks are signed via Proof-of-Authority (HMAC-SHA256 / Ed25519) |
| 🛡️ Tamper Detection | Any modification to ledger.json will fail chain validation |
| 📜 Chain of Custody | Full audit timeline per evidence ID and per case |
| 🔑 API Key Protection | Only trusted services can record or query the chain |

---

## Folder Structure

```
blockchain/
├── server.js                     ← Express API server (port 6000)
├── package.json
├── .env.example                  ← Copy to .env and configure
│
├── core/
│   ├── Block.js                  ← Block class (hash, merkleRoot, signature)
│   ├── Blockchain.js             ← Chain management + validation
│   ├── MerkleTree.js             ← Merkle root computation
│   └── Consensus.js              ← Proof-of-Authority block signing
│
├── ledger/
│   └── LedgerStore.js            ← Persist chain to ledger.json
│
├── chaincode/
│   └── evidenceChaincode.js      ← Smart-contract logic (record, verify, audit)
│
├── api/
│   ├── routes/
│   │   ├── blockchainRoutes.js   ← Core chain API
│   │   └── auditRoutes.js        ← Custody timeline and audit API
│   └── middleware/
│       └── apiKeyAuth.js         ← API key protection
│
└── utils/
    ├── hashUtils.js              ← SHA-256, double-hash, HMAC helpers
    └── signUtils.js              ← Ed25519 key generation and signing
```

---

## Quick Start

```bash
cd blockchain
cp .env.example .env
npm install
npm start
```

Server starts on **http://localhost:6000**.

---

## REST API

All endpoints (except `/health`) require the header:
```
x-api-key: evisecure-blockchain-secret-key
```

### Blockchain Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/health` | Service health check |
| `POST` | `/api/blockchain/record` | Record an evidence action |
| `GET`  | `/api/blockchain/verify/:evidenceId?currentHash=<sha256>` | Verify evidence integrity |
| `GET`  | `/api/blockchain/history/:evidenceId` | All blocks for an evidence item |
| `GET`  | `/api/blockchain/case/:caseId` | All blocks for a case |
| `GET`  | `/api/blockchain/chain` | Full blockchain (admin) |
| `GET`  | `/api/blockchain/block/:index` | Single block by index |
| `GET`  | `/api/blockchain/validate` | Validate entire chain integrity |

### Audit Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/api/audit/custody/:evidenceId` | Human-readable custody timeline |
| `GET`  | `/api/audit/case/:caseId` | Grouped audit log for a case |
| `GET`  | `/api/audit/stats` | Blockchain statistics |

---

## Example: Record an Upload

```bash
curl -X POST http://localhost:6000/api/blockchain/record \
  -H "Content-Type: application/json" \
  -H "x-api-key: evisecure-blockchain-secret-key" \
  -d '{
    "evidenceId": "EVD0001",
    "caseId": "CASE001",
    "action": "UPLOAD",
    "actorId": "user_123",
    "actorRole": "police",
    "fileHash": "a3f9d...",
    "description": "CCTV footage uploaded"
  }'
```

## Example: Verify Evidence Integrity

```bash
curl "http://localhost:6000/api/blockchain/verify/EVD0001?currentHash=a3f9d..." \
  -H "x-api-key: evisecure-blockchain-secret-key"
```

Response:
```json
{
  "verified": true,
  "tampered": false,
  "reason": "✅ Evidence is intact — hash matches original upload"
}
```

---

## How It Integrates with the Backend

After every evidence action in `evidenceController.js`, the backend calls:

```js
await axios.post('http://localhost:6000/api/blockchain/record', {
  evidenceId, caseId, action, actorId, actorRole, fileHash
}, { headers: { 'x-api-key': process.env.BLOCKCHAIN_API_KEY } });
```

This is **optional** — the blockchain runs independently and does not affect the backend's MongoDB operations.

---

## Role Access Model

| Role | Permitted Actions |
|------|-----------------|
| Police / Investigator | UPLOAD, VIEW, DOWNLOAD |
| Forensic Analyst | VIEW, ANALYSE, VERIFY |
| Judge / Court | COURT_REVIEW, VIEW |
| Admin | All actions |

---

*Built by Jaishree — EviSecure Blockchain Module*
