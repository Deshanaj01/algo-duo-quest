const { adminAuth } = require('../config/firebase');

/**
 * Verify Firebase ID token from Authorization header.
 * Sets req.user = { uid, email, displayName }
 */
const verifyFirebaseToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No authentication token provided'
      });
    }

    const idToken = authHeader.split('Bearer ')[1];
    const decodedToken = await adminAuth.verifyIdToken(idToken);

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email || null,
      displayName: decodedToken.name || 'Anonymous'
    };

    next();
  } catch (error) {
    console.error('Firebase auth error:', error.message);
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired authentication token'
    });
  }
};

/**
 * Optional Firebase auth — attaches user if token present, continues otherwise.
 */
const optionalFirebaseAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const idToken = authHeader.split('Bearer ')[1];
      const decodedToken = await adminAuth.verifyIdToken(idToken);
      req.user = {
        uid: decodedToken.uid,
        email: decodedToken.email || null,
        displayName: decodedToken.name || 'Anonymous'
      };
    }
  } catch (_) {
    // Token invalid, continue without user
  }
  next();
};

module.exports = { verifyFirebaseToken, optionalFirebaseAuth };
