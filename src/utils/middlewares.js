const { CONFIG } = require('../../config');
const { verifyToken } = require('./jwt-token');

exports.staffAuthMiddleware = function (req, res, next) {
  const token = req.headers.authorization;

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({
      status: false,
      error: 'Unauthorized',
    });
  }

  try {
    const decoded = verifyToken(
      token.split(' ')[1],
      CONFIG.JWT_TOKEN_KEY.STAFF
    );

    if (!decoded) {
      return res.status(401).json({
        status: false,
        error: 'Unauthorized',
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({
        status: false,
        error: 'Unauthorized',
      });
    }
  }
};

exports.adminAuthMiddleware = function (req, res, next) {
  const token = req.headers.authorization;

  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({
      status: false,
      error: 'Unauthorized',
    });
  }

  try {
    const decoded = verifyToken(
      token.split(' ')[1],
      CONFIG.JWT_TOKEN_KEY.ADMIN
    );

    if (!decoded) {
      return res.status(401).json({
        status: false,
        error: 'Unauthorized',
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof Error) {
      return res.status(401).json({
        status: false,
        error: 'Unauthorized',
      });
    }
  }
};
