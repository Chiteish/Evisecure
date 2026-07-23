const express = require('express');
const router = express.Router();
const { getCustodyTimeline, getCaseHistory } = require('../../chaincode/evidenceChaincode');
const { getInstance } = require('../../core/Blockchain');

// ── GET /api/audit/custody/:evidenceId ────────────────────────────────────────
// Returns a clean, human-readable chain-of-custody timeline (for judges/courts)
router.get('/custody/:evidenceId', (req, res) => {
  try {
    const timeline = getCustodyTimeline(req.params.evidenceId);

    if (timeline.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No custody records found for this evidence ID.',
      });
    }

    return res.status(200).json({
      success: true,
      evidenceId: req.params.evidenceId,
      totalEvents: timeline.length,
      timeline,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// ── GET /api/audit/case/:caseId ───────────────────────────────────────────────
// All evidence events for a case, grouped by evidenceId
router.get('/case/:caseId', (req, res) => {
  try {
    const records = getCaseHistory(req.params.caseId);

    // Group by evidenceId
    const grouped = records.reduce((acc, block) => {
      const eid = block.data.evidenceId;
      if (!acc[eid]) acc[eid] = [];
      acc[eid].push({
        blockIndex: block.index,
        action:     block.data.action,
        actor:      block.data.actorId,
        role:       block.data.actorRole,
        timestamp:  block.data.recordedAt,
        fileHash:   block.data.fileHash,
      });
      return acc;
    }, {});

    return res.status(200).json({
      success: true,
      caseId: req.params.caseId,
      evidenceCount: Object.keys(grouped).length,
      auditLog: grouped,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

// ── GET /api/audit/stats ──────────────────────────────────────────────────────
// Blockchain stats overview
router.get('/stats', (req, res) => {
  const blockchain = getInstance();
  const chain = blockchain.getChain();

  const actionCounts = chain.reduce((acc, block) => {
    if (block.data && block.data.action) {
      acc[block.data.action] = (acc[block.data.action] || 0) + 1;
    }
    return acc;
  }, {});

  return res.status(200).json({
    success: true,
    totalBlocks: chain.length,
    genesisBlock: chain[0]?.hash || null,
    latestBlock: chain[chain.length - 1]?.hash || null,
    actionBreakdown: actionCounts,
  });
});

module.exports = router;
