require('dotenv').config();
const express = require('express');
const cors    = require('cors');

const apiKeyAuth       = require('./api/middleware/apiKeyAuth');
const blockchainRoutes = require('./api/routes/blockchainRoutes');
const auditRoutes      = require('./api/routes/auditRoutes');
const { getInstance }  = require('./core/Blockchain');

const app  = express();
const PORT = process.env.BLOCKCHAIN_PORT || 6000;

// ── Middleware ─────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Health check (no auth required) ───────────────────────────────────────────
app.get('/health', (req, res) => {
  const blockchain = getInstance();
  res.json({
    status:      'online',
    service:     'EviSecure Blockchain Node',
    chainLength: blockchain.getLength(),
    timestamp:   new Date().toISOString(),
  });
});

// ── Protected routes ───────────────────────────────────────────────────────────
app.use('/api/blockchain', apiKeyAuth, blockchainRoutes);
app.use('/api/audit',      apiKeyAuth, auditRoutes);

// ── 404 handler ────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

// ── Start ──────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🔗 EviSecure Blockchain Node running on port ${PORT}`);
  console.log(`   Health check : http://localhost:${PORT}/health`);
  console.log(`   Blockchain   : http://localhost:${PORT}/api/blockchain`);
  console.log(`   Audit        : http://localhost:${PORT}/api/audit\n`);

  // Ensure blockchain is initialised (genesis block created if first run)
  const blockchain = getInstance();
  console.log(`   Chain length : ${blockchain.getLength()} block(s)`);
  const valid = blockchain.isChainValid();
  console.log(`   Chain valid  : ${valid.valid ? '✅ Yes' : '❌ No — ' + valid.errors.join(', ')}\n`);
});
