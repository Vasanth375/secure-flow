const { Jwt, verify } = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt_token;
  if (!token) {
    return res.status(400).json("Login Required");
  }
  verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json("Token isn't Valid");
    req.user = user;
    
    next();
  });
};

module.exports = verifyToken;
