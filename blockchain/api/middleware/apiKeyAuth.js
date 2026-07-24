/**
 * apiKeyAuth.js — Middleware to protect blockchain API endpoints
 *
 * Only the EviSecure backend (or authorised services) can call these endpoints.
 * The shared secret is set in .env as BLOCKCHAIN_API_KEY.
 */

const BLOCKCHAIN_API_KEY = process.env.BLOCKCHAIN_API_KEY || 'evisecure-blockchain-secret-key';

function apiKeyAuth(req, res, next) {
  const provided = req.headers['x-api-key'] || req.query.apiKey;

  if (!provided) {
    return res.status(401).json({
      success: false,
      message: 'API key missing. Include x-api-key header.',
    });
  }

  if (provided !== BLOCKCHAIN_API_KEY) {
    return res.status(403).json({
      success: false,
      message: 'Invalid API key.',
    });
  }

  next();
}

module.exports = apiKeyAuth;
