const crypto = require('crypto');

/**
 * hashUtils.js — Cryptographic hashing utilities
 */

/**
 * Compute SHA-256 hash of a string or Buffer.
 * @param {string|Buffer} data
 * @returns {string} hex hash
 */
function sha256(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

/**
 * Compute double SHA-256 (SHA-256 of SHA-256), used in Bitcoin-style chains.
 * @param {string|Buffer} data
 * @returns {string} hex hash
 */
function doubleSha256(data) {
  const firstPass = crypto.createHash('sha256').update(data).digest();
  return crypto.createHash('sha256').update(firstPass).digest('hex');
}

/**
 * Compute HMAC-SHA256 with a given secret.
 * @param {string} data
 * @param {string} secret
 * @returns {string} hex HMAC
 */
function hmacSha256(data, secret) {
  return crypto.createHmac('sha256', secret).update(data).digest('hex');
}

/**
 * Hash a JSON object (deterministic — keys sorted before hashing).
 * @param {Object} obj
 * @returns {string} hex hash
 */
function hashObject(obj) {
  const sorted = JSON.stringify(obj, Object.keys(obj).sort());
  return sha256(sorted);
}

/**
 * Generate a random nonce (hex string).
 * @param {number} bytes
 * @returns {string}
 */
function randomNonce(bytes = 16) {
  return crypto.randomBytes(bytes).toString('hex');
}

module.exports = {
  sha256,
  doubleSha256,
  hmacSha256,
  hashObject,
  randomNonce,
};
