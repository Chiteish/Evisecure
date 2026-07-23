const express = require('express');
const router = express.Router();
const { getInstance } = require('../../core/Blockchain');
const {
  recordEvidenceAction,
  verifyEvidence,
  getEvidenceHistory,
  getCaseHistory,
} = require('../../chaincode/evidenceChaincode');

// ── POST /api/blockchain/record ────────────────────────────────────────────────
// Record a new evidence action (called by backend after upload/view/etc.)
router.post('/record', (req, res) => {
  try {
    const block = recordEvidenceAction(req.body);
    return res.status(201).json({
      success: true,
      message: 'Evidence action recorded on blockchain.',
      block,
    });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
});

// ── GET /api/blockchain/verify/:evidenceId ─────────────────────────────────────
// Verify that an evidence file has not been tampered with
// Pass ?currentHash=<sha256> as query param
router.get('/verify/:evidenceId', (req, res) => {
  try {
    const { evidenceId } = req.params;
    const { currentHash } = req.query;

    if (!currentHash) {
      return res.status(400).json({
        success: false,
        message: 'currentHash query parameter is required.',
      });
    }

    const result = verifyEvidence(evidenceId, currentHash);
    return res.status(200).json({ success: true, result });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// ── GET /api/blockchain/history/:evidenceId ────────────────────────────────────
// Full blockchain history for a piece of evidence
router.get('/history/:evidenceId', (req, res) => {
  try {
    const history = getEvidenceHistory(req.params.evidenceId);
    return res.status(200).json({
      success: true,
      evidenceId: req.params.evidenceId,
      count: history.length,
      history,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// ── GET /api/blockchain/case/:caseId ──────────────────────────────────────────
// All blockchain records for a case
router.get('/case/:caseId', (req, res) => {
  try {
    const history = getCaseHistory(req.params.caseId);
    return res.status(200).json({
      success: true,
      caseId: req.params.caseId,
      count: history.length,
      history,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// ── GET /api/blockchain/chain ──────────────────────────────────────────────────
// Return the entire blockchain (admin use)
router.get('/chain', (req, res) => {
  const blockchain = getInstance();
  return res.status(200).json({
    success: true,
    length: blockchain.getLength(),
    chain: blockchain.getChain(),
  });
});

// ── GET /api/blockchain/block/:index ──────────────────────────────────────────
// Return a single block by index
router.get('/block/:index', (req, res) => {
  const blockchain = getInstance();
  const index = parseInt(req.params.index, 10);
  const block = blockchain.getBlock(index);
  if (!block) {
    return res.status(404).json({ success: false, message: 'Block not found.' });
  }
  return res.status(200).json({ success: true, block });
});

// ── GET /api/blockchain/validate ───────────────────────────────────────────────
// Validate the integrity of the entire chain
router.get('/validate', (req, res) => {
  const blockchain = getInstance();
  const result = blockchain.isChainValid();
  return res.status(200).json({ success: true, ...result });
});

module.exports = router;
