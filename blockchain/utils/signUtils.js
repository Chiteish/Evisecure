const crypto = require('crypto');

/**
 * signUtils.js — Digital signature utilities (Ed25519 simulation via ECDH/HMAC)
 *
 * Node.js 15+ natively supports Ed25519. For earlier versions, we fall back to
 * HMAC-SHA256 with a secret key. In production, replace with proper Ed25519
 * key pairs stored in an HSM (Hardware Security Module) or Fabric CA.
 */

/**
 * Generate an Ed25519 key pair (Node 15+).
 * Returns { publicKey, privateKey } as hex strings.
 */
function generateKeyPair() {
  const { publicKey, privateKey } = crypto.generateKeyPairSync('ed25519');
  return {
    publicKey:  publicKey.export({ type: 'spki', format: 'der' }).toString('hex'),
    privateKey: privateKey.export({ type: 'pkcs8', format: 'der' }).toString('hex'),
  };
}

/**
 * Sign data with a private key (Ed25519).
 * @param {string} data         - data to sign (string)
 * @param {string} privateKeyHex - hex-encoded DER private key
 * @returns {string} hex signature
 */
function sign(data, privateKeyHex) {
  const privateKey = crypto.createPrivateKey({
    key: Buffer.from(privateKeyHex, 'hex'),
    format: 'der',
    type: 'pkcs8',
  });
  return crypto.sign(null, Buffer.from(data), privateKey).toString('hex');
}

/**
 * Verify a signature with a public key (Ed25519).
 * @param {string} data          - original data
 * @param {string} signatureHex  - hex signature
 * @param {string} publicKeyHex  - hex-encoded DER public key
 * @returns {boolean}
 */
function verify(data, signatureHex, publicKeyHex) {
  try {
    const publicKey = crypto.createPublicKey({
      key: Buffer.from(publicKeyHex, 'hex'),
      format: 'der',
      type: 'spki',
    });
    return crypto.verify(
      null,
      Buffer.from(data),
      publicKey,
      Buffer.from(signatureHex, 'hex')
    );
  } catch {
    return false;
  }
}

module.exports = {
  generateKeyPair,
  sign,
  verify,
};
