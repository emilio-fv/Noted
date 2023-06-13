const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const token = authHeader.split(' ')[1]

  jwt.verify(
    token, 
    process.env.ACCESS_SECRET_KEY, 
    async (err, decoded) => {
      if (err) {
        return res.status(401).json({ verified: false });
      }
      next();
  })
};

module.exports = { verifyJWT };