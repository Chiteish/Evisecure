const crypto = require('crypto');
const Block = require('./Block');

class MerkleTree {
  /**
   * Given an array of strings (hashes, IDs, etc.), compute a Merkle root.
   */
  static computeRoot(items) {
    if (!items || items.length === 0) return crypto.createHash('sha256').update('').digest('hex');

    let layer = items.map(item =>
      crypto.createHash('sha256').update(String(item)).digest('hex')
    );

    while (layer.length > 1) {
      const nextLayer = [];
      for (let i = 0; i < layer.length; i += 2) {
        const left = layer[i];
        const right = layer[i + 1] || left; // duplicate last node if odd
        const combined = crypto.createHash('sha256').update(left + right).digest('hex');
        nextLayer.push(combined);
      }
      layer = nextLayer;
    }

    return layer[0];
  }
}

module.exports = MerkleTree;
