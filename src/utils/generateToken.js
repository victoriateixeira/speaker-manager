const Crypto = require('crypto');

function generateToken(size = 16) {
  return Crypto
  .randomBytes(size)
  .toString('base64')
  .slice(0, size);
}
console.log(typeof (generateToken()));

module.exports = generateToken;