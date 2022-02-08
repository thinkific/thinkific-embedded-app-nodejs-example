const crypto = require('crypto');
require('dotenv').config();

function calculateExpirationTime(expiresIn) {
  const now = new Date().getTime();
  return now + expiresIn * 1000;
}

function base64EncodeUrlSafe(string) {
  return string
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

function codeChallenge(codeVerifier) {
  return base64EncodeUrlSafe(sha256(codeVerifier));
}

function sha256(codeVerifier) {
  return crypto.createHash('sha256').update(codeVerifier).digest();
}

function verifyHmacSignature(hmac, subdomain, tgid, timestamp) {
  const query = `subdomain=${subdomain}&tgid=${tgid}&timestamp=${timestamp}`;
  return (hmac === crypto
    .createHmac('sha256', process.env.CLIENT_SECRET)
    .update(query)
    .digest('hex'));
}

module.exports = {
  base64EncodeUrlSafe,
  calculateExpirationTime,
  codeChallenge,
  sha256,
  verifyHmacSignature,
};
