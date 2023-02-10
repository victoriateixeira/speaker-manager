const Crypto = require('crypto');

function generateToken(size = 16) {
  // return crypto.randomBytes(8).toString('hex');
  return Crypto
  .randomBytes(size)
  .toString('base64')
  .slice(0, size);
}
console.log(generateToken());

module.exports = generateToken;