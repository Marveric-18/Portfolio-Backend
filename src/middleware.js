const jwt = require('jsonwebtoken');

const  verifyToken = (req, res, next) => {
  const token = req.headers['access_token'];

  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.AUTH_SECRET);

    // Attach the decoded token payload to the request object
    req.user = decoded;

    // Call the next middleware or route handler
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
}

module.exports = verifyToken;
