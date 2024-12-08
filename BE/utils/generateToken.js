import jwt from "jsonwebtoken";
export function generateToken(res, userId) {
  let token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV==="production", // Should be true in production with HTTPS
    samesite: "strict", // Allows sending cookies with same-origin navigation and GET requests
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  return token;
}
export function verifyToken(req, res, next) {
  let token = req.cookies.token;
  if (!token) {
    return res.status(400).send({
      message: "you are not authenticated",
    });
  }
  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(400).send({
      message: "invalid token",
    });
  }
}
