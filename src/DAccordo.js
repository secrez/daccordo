const fs = require('fs-extra')
const path = require('path')
const ethers = require('ethers')
const Crypto = require("@secrez/crypto");

class DAccordo {

  static exec(options) {
    if (options.generate) {
      console.info(JSON.stringify(DAccordo.newKeyPair(), null, 2));
    }
  }

  static newKeyPair() {
    return Crypto.generateBoxKeyPair(true);
  }

  static encryptObject(data, mySecretKey, theirPublicKey) {
    if (typeof data === 'object') {
      data = JSON.stringify(data)
    }
    return Crypto.boxEncrypt(mySecretKey, data, theirPublicKey);
  }

  static decryptJSONString(
      data,
      mySecretKey,
      theirPublicKey
  ) {
    const decrypted = Crypto.boxDecrypt(mySecretKey, data, theirPublicKey)
    return JSON.parse(decrypted)
  }

}

module.exports = DAccordo;

