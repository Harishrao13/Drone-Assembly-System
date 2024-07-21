const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  // Check for token in headers or cookies
  const authHeader = req.headers['authorization'];
  const token = authHeader ? authHeader.split(' ')[1] : req.cookies['_auth'];

  if (!token) {
    return res.status(401).json({ msg: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); 
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return res.status(401).json({ msg: 'Invalid token', error: error.message });
  }
};

module.exports = verifyToken;
