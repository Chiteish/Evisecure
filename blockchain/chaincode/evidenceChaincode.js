/**
 * evidenceChaincode.js — "Smart Contract" for Evidence Management
 *
 * Mirrors what a Hyperledger Fabric chaincode would do:
 *  - recordEvidenceAction : log any evidence event onto the blockchain
 *  - verifyEvidence       : check that a file's current SHA-256 matches the stored hash
 *  - getEvidenceHistory   : full audit trail for a piece of evidence
 *  - getCustodyTimeline   : timeline view for judges / courts
 */

const { getInstance } = require('../core/Blockchain');

// ── Action types (mirrors backend ChainOfCustody schema) ──────────────────────
const ACTIONS = Object.freeze({
  UPLOAD:   'UPLOAD',
  VIEW:     'VIEW',
  DOWNLOAD: 'DOWNLOAD',
  UPDATE:   'UPDATE',
  VERIFY:   'VERIFY',
  DELETE:   'DELETE',
  RESTORE:  'RESTORE',
  ANALYSE:  'ANALYSE',   // Forensic analyst adds findings
  COURT_REVIEW: 'COURT_REVIEW', // Judge reviews evidence
});

// ── Core chaincode functions ───────────────────────────────────────────────────

/**
 * Record an evidence action on the blockchain.
 *
 * @param {Object} payload
 * @param {string} payload.evidenceId     - EVD0001
 * @param {string} payload.evidenceNumber - EVD0001
 * @param {string} payload.caseId         - MongoDB case ID
 * @param {string} payload.action         - One of ACTIONS
 * @param {string} payload.actorId        - User ID
 * @param {string} payload.actorRole      - police | forensic | judge | admin
 * @param {string} payload.fileHash       - SHA-256 of the file at time of action
 * @param {string} [payload.ipAddress]
 * @param {string} [payload.description]
 * @param {Object} [payload.metadata]     - any extra fields
 * @returns {Object} the new block
 */
function recordEvidenceAction(payload) {
  if (!ACTIONS[payload.action]) {
    throw new Error(`Invalid action: ${payload.action}. Must be one of: ${Object.keys(ACTIONS).join(', ')}`);
  }

  if (!payload.evidenceId || !payload.caseId || !payload.actorId) {
    throw new Error('Missing required fields: evidenceId, caseId, actorId');
  }

  const blockchain = getInstance();
  const block = blockchain.addBlock({
    evidenceId:     payload.evidenceId,
    evidenceNumber: payload.evidenceNumber || payload.evidenceId,
    caseId:         payload.caseId,
    action:         payload.action,
    actorId:        payload.actorId,
    actorRole:      payload.actorRole || 'unknown',
    fileHash:       payload.fileHash || null,
    ipAddress:      payload.ipAddress || null,
    description:    payload.description || '',
    metadata:       payload.metadata || {},
    recordedAt:     new Date().toISOString(),
  });

  return block;
}

/**
 * Verify that evidence has not been tampered with.
 *
 * @param {string} evidenceId  - Evidence ID to look up
 * @param {string} currentHash - SHA-256 of the current file on disk
 * @returns {Object} verification result
 */
function verifyEvidence(evidenceId, currentHash) {
  const blockchain = getInstance();
  const history = blockchain.getEvidenceHistory(evidenceId);

  if (history.length === 0) {
    return {
      evidenceId,
      verified: false,
      reason: 'No blockchain record found for this evidence ID',
    };
  }

  // The UPLOAD block should be the first record for this evidence
  const uploadBlock = history.find(b => b.data.action === 'UPLOAD');

  if (!uploadBlock) {
    return {
      evidenceId,
      verified: false,
      reason: 'No UPLOAD record found on blockchain',
    };
  }

  const originalHash = uploadBlock.data.fileHash;
  const tampered     = currentHash !== originalHash;

  return {
    evidenceId,
    verified:      !tampered,
    tampered,
    originalHash,
    currentHash,
    uploadBlock:   uploadBlock.index,
    uploadedAt:    uploadBlock.data.recordedAt,
    reason:        tampered
      ? '⚠️  File hash mismatch — evidence may have been altered'
      : '✅  Evidence is intact — hash matches original upload',
  };
}

/**
 * Return the full chain-of-custody history for an evidence item.
 *
 * @param {string} evidenceId
 * @returns {Array} array of blocks
 */
function getEvidenceHistory(evidenceId) {
  const blockchain = getInstance();
  return blockchain.getEvidenceHistory(evidenceId);
}

/**
 * Return a human-readable custody timeline for court use.
 *
 * @param {string} evidenceId
 * @returns {Array} array of timeline events
 */
function getCustodyTimeline(evidenceId) {
  const history = getEvidenceHistory(evidenceId);
  return history.map(block => ({
    blockIndex:  block.index,
    blockHash:   block.hash,
    action:      block.data.action,
    actor:       block.data.actorId,
    role:        block.data.actorRole,
    description: block.data.description,
    timestamp:   block.data.recordedAt,
    fileHash:    block.data.fileHash,
  }));
}

/**
 * Return all evidence actions for a specific case.
 *
 * @param {string} caseId
 * @returns {Array} array of blocks
 */
function getCaseHistory(caseId) {
  const blockchain = getInstance();
  return blockchain.getCaseHistory(caseId);
}

module.exports = {
  ACTIONS,
  recordEvidenceAction,
  verifyEvidence,
  getEvidenceHistory,
  getCustodyTimeline,
  getCaseHistory,
};
