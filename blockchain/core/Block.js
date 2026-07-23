const crypto = require('crypto');

class Block {
  constructor(index, previousHash, data, timestamp = Date.now()) {
    this.index = index;
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.data = data; // object containing evidence metadata
    this.nonce = 0;
    this.merkleRoot = Block.computeMerkleRoot(data);
    this.hash = this.computeHash();
    this.signature = null; // will be set by consensus module
  }

  static computeMerkleRoot(data) {
    // simple merkle root: hash of JSON string
    const json = JSON.stringify(data);
    return crypto.createHash('sha256').update(json).digest('hex');
  }

  computeHash() {
    const blockString = `${this.index}${this.timestamp}${this.previousHash}${this.merkleRoot}${this.nonce}`;
    return crypto.createHash('sha256').update(blockString).digest('hex');
  }

  // Proof‑of‑Authority signing (placeholder – actual signing done by Consensus module)
  sign(signature) {
    this.signature = signature;
  }
}

module.exports = Block;
