const fs = require('fs-extra');
const path = require('path');
const BLOCKCHAIN_FILE = path.join(__dirname, '..', 'ledger', 'ledger.json');

class LedgerStore {
  constructor() {
    if (!fs.existsSync(BLOCKCHAIN_FILE)) {
      // Initialize with empty array
      fs.ensureFileSync(BLOCKCHAIN_FILE);
      fs.writeJsonSync(BLOCKCHAIN_FILE, []);
    }
  }

  getChain() {
    return fs.readJsonSync(BLOCKCHAIN_FILE);
  }

  saveChain(chain) {
    fs.writeJsonSync(BLOCKCHAIN_FILE, chain, { spaces: 2 });
  }
}

module.exports = new LedgerStore();
