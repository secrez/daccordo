const {assert} = require('chai')
const stdout = require('test-console').stdout
const DAccordo = require('../src/DAccordo')

describe('daccordo', async function () {

  describe('encrypt/decrypt using sharedSecret', function () {

    let pairA = DAccordo.newKeyPair()
    let pairB = DAccordo.newKeyPair()

    it('should encrypt and decrypt using keys combination', async function () {

      const bodyParams = {
        name: "Francesco",
        email: "francesco@sullo.co"
      }

      const encryptedParams = DAccordo.encryptObject(
          bodyParams,
          pairA.secretKey,
          pairB.publicKey
      );

      const bodyParams2 = DAccordo.decryptJSONString(
          encryptedParams,
          pairB.secretKey,
          pairA.publicKey
      );

      assert.deepEqual(bodyParams, bodyParams2)

    })

    it('should generate a key via global tool', async function () {

      let inspect = stdout.inspect()
      DAccordo.exec({
        generate: true
      })
      inspect.restore()

      let pair = JSON.parse(inspect.output)

      assert.equal(pair.secretKey.length, pair.publicKey.length)
      assert.equal(pair.secretKey.length, 64)

    })


  })
})
