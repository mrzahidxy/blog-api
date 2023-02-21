const jwt = require("jsonwebtoken");
const Blog = require("../models/Blog");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "zahid10xy", (err, user) => {
      if (err) res.status(403).json("Token is invalid");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authentictaed!");
  }
};

const verifyTokenAndAuthorization = async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  verifyToken(req, res, () => {
    if (req.user.id === blog.userId || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if ((req.user, isAdmin)) {
      next();
    } else {
      res.status(403).json("You are nit allowed to do that!");
    }
  });
};

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
