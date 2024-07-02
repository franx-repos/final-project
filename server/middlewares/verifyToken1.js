import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';


const getTokenFromRequest = (req) => {
  if (req.cookies.token) {
    return req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    return req.headers.authorization.split(' ')[1];
  }
  return null;
};

const verifyToken1 = asyncHandler(async (req, res, next) => {
  const token = getTokenFromRequest(req);

  if (!token) {
    return res.status(401).json({ error: 'Please login' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.cid = decoded.cid;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Not authorized, token failed' });
  }
});

export default verifyToken1;
