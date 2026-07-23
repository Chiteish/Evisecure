const crypto = require('crypto');

/**
 * Consensus.js — Proof-of-Authority (PoA) validator module
 *
 * In a real Hyperledger Fabric network, block signing is handled by
 * orderer nodes using ECDSA keys. Here we simulate it with HMAC-SHA256
 * using a shared secret (the node's authority key), making it easy to
 * verify without a full PKI setup.
 *
 * In production, replace HMAC with actual Ed25519/ECDSA key-pair signing.
 */

const AUTHORITY_SECRET = process.env.AUTHORITY_SECRET || 'evisecure-authority-key-2024';

// Registered validator nodes (simulated)
const VALIDATORS = [
  { id: 'node-police',   role: 'police',   active: true },
  { id: 'node-forensic', role: 'forensic', active: true },
  { id: 'node-court',    role: 'court',    active: true },
];

class Consensus {
  /**
   * Sign a block's hash using HMAC-SHA256 (PoA simulation).
   * @param {string} blockHash
   * @returns {string} hex signature
   */
  static signBlock(blockHash) {
    return crypto
      .createHmac('sha256', AUTHORITY_SECRET)
      .update(blockHash)
      .digest('hex');
  }

  /**
   * Verify a block's signature.
   * @param {string} blockHash
   * @param {string} signature
   * @returns {boolean}
   */
  static verifySignature(blockHash, signature) {
    const expected = this.signBlock(blockHash);
    return crypto.timingSafeEqual(
      Buffer.from(expected, 'hex'),
      Buffer.from(signature, 'hex')
    );
  }

  /**
   * Return the list of active validator nodes.
   */
  static getValidators() {
    return VALIDATORS.filter(v => v.active);
  }

  /**
   * Check if a given role is an authorised validator.
   */
  static isAuthorised(role) {
    return VALIDATORS.some(v => v.role === role && v.active);
  }
}

module.exports = Consensus;
