const jwt = require('jsonwebtoken');
const User = require('../schemas/userModel');

// Middleware to verify token and attach user to request
const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

// Middleware to allow only certain roles (e.g., ['admin'], ['educator', 'admin'])
const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied: Insufficient permissions' });
    }
    next();
  };
};

module.exports = {
  auth,
  requireRole,
};

// module.exports = { authenticateToken, isAdmin };



// const jwt = require('jsonwebtoken');
// const User = require('../schemas/userModel');

// // ✅ Middleware to verify JWT token and attach user to request
// const authenticateToken = async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Unauthorized: No token provided' });
//   }

//   const token = authHeader.split(' ')[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id).select('-password');
//     if (!user) {
//       return res.status(401).json({ message: 'Unauthorized: User not found' });
//     }
//     req.user = user;
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: 'Unauthorized: Invalid token' });
//   }
// };

// // ✅ Middleware to allow only admin users
// const isAdmin = (req, res, next) => {
//   if (!req.user || req.user.role !== 'admin') {
//     return res.status(403).json({ message: 'Access denied: Admins only' });
//   }
//   next();
// };

// module.exports = {
//   authenticateToken,
//   isAdmin,
// };
