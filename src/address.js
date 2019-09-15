import * as bip39 from 'bip39';
import * as bip32 from 'bip32';
import TronWeb from 'tronweb';
import crypto from 'crypto';
import assert from 'assert'

export class TronAddress {

    static generateMnemonic() {
        return bip39.entropyToMnemonic(crypto.randomBytes(16));
    }
    constructor(mnemonic, index = 0) {
        assert(mnemonic,'Missing 1st argument mnemonic, run Address.generateMnemonic() to generate');
        assert(bip39.validateMnemonic(mnemonic),'Invalid mnemonic seed.');
        this.currentIndex = index;
        this.mnemonic = mnemonic;
        this._generateHdNode();
    }
    _generateHdNode() {
        const seed = bip39.mnemonicToSeedSync(this.mnemonic);
        this.node = bip32.fromSeed(seed);
    }
    createAddress() {
      this.currentIndex++;
      const {address, index} = this.getAddressInfo(this.currentIndex);
      return {index,address};
    }
    get masterInfo() {
      return {mnemonic: this.mnemonic, ...this.getAddressInfo(0)}
    }
    get master(){
      return this.getAddress(0);
    }
    getAddress(index) {
      index = parseInt(index);
      return this.getAddressInfo(index).address;
    }
    getAddressInfo(index) {
        index = parseInt(index);
        const child = this.node.derivePath(`m/44'/195'/${ index }'/0/0`);
        const privateKey = child.privateKey.toString('hex');
        const address = TronWeb.address.fromPrivateKey(privateKey);
        return {
            index,
            privateKey,
            address
        };
    }
}