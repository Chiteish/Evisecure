const Block = require('./Block');
const Consensus = require('./Consensus');
const LedgerStore = require('../ledger/LedgerStore');

class Blockchain {
  constructor() {
    const stored = LedgerStore.getChain();
    if (stored.length === 0) {
      // Create genesis block
      const genesis = this._createGenesisBlock();
      this.chain = [genesis];
      LedgerStore.saveChain(this.chain);
    } else {
      this.chain = stored;
    }
  }

  // ── Genesis Block ──────────────────────────────────────────────────────────

  _createGenesisBlock() {
    const genesisData = {
      type: 'GENESIS',
      message: 'EviSecure Evidence Blockchain — Genesis Block',
      system: 'Blockchain for Digital Evidence Chain of Custody',
      createdAt: new Date().toISOString(),
    };
    const block = new Block(0, '0'.repeat(64), genesisData, Date.now());
    block.sign(Consensus.signBlock(block.hash));
    return block;
  }

  // ── Chain Access ───────────────────────────────────────────────────────────

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  getChain() {
    return this.chain;
  }

  getBlock(index) {
    return this.chain[index] || null;
  }

  getLength() {
    return this.chain.length;
  }

  // ── Add Block ──────────────────────────────────────────────────────────────

  /**
   * Add a new evidence action record to the chain.
   * @param {Object} data - Evidence metadata object
   * @returns {Block} the newly added block
   */
  addBlock(data) {
    const previousBlock = this.getLatestBlock();
    const newBlock = new Block(
      this.chain.length,
      previousBlock.hash,
      data,
      Date.now()
    );
    newBlock.sign(Consensus.signBlock(newBlock.hash));
    this.chain.push(newBlock);
    LedgerStore.saveChain(this.chain);
    return newBlock;
  }

  // ── Validation ─────────────────────────────────────────────────────────────

  /**
   * Validate the entire chain.
   * Returns { valid: boolean, errors: string[] }
   */
  isChainValid() {
    const errors = [];

    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const previous = this.chain[i - 1];

      // Recompute hash from stored block fields
      const block = new Block(
        current.index,
        current.previousHash,
        current.data,
        current.timestamp
      );
      const recomputedHash = block.computeHash();

      if (current.hash !== recomputedHash) {
        errors.push(`Block #${i}: hash mismatch (data may have been tampered)`);
      }

      if (current.previousHash !== previous.hash) {
        errors.push(`Block #${i}: previousHash does not match block #${i - 1}`);
      }

      if (current.signature) {
        const sigValid = Consensus.verifySignature(current.hash, current.signature);
        if (!sigValid) {
          errors.push(`Block #${i}: invalid authority signature`);
        }
      }
    }

    return {
      valid: errors.length === 0,
      blockCount: this.chain.length,
      errors,
    };
  }

  // ── Evidence History ───────────────────────────────────────────────────────

  /**
   * Return all blocks that contain records for a given evidenceId.
   */
  getEvidenceHistory(evidenceId) {
    return this.chain.filter(
      block =>
        block.data &&
        block.data.evidenceId === evidenceId
    );
  }

  /**
   * Return all blocks related to a given caseId.
   */
  getCaseHistory(caseId) {
    return this.chain.filter(
      block =>
        block.data &&
        block.data.caseId === caseId
    );
  }
}

// Export singleton so the same chain is shared across the app
let instance = null;
module.exports = {
  getInstance: () => {
    if (!instance) instance = new Blockchain();
    return instance;
  },
  Blockchain,
};
