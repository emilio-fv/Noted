const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const token = authHeader.split(' ')[1]

  jwt.verify(
    token, 
    process.env.ACCESS_SECRET_KEY, 
    (err, payload) => {
      if (err) {
        res.status(401).json({ verified: false });
      }
      // TODO: attach necessary user info
      next();
  })
};

module.exports = { verifyJWT };