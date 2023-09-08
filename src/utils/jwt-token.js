const jwt = require('jsonwebtoken');
const { CONFIG } = require('../../config');

exports.generateToken = function (payload, key) {
  return jwt.sign(payload, key, { issuer: CONFIG.APP_NAME });
};

exports.verifyToken = function (token, key) {
  return jwt.verify(token, key);
};
