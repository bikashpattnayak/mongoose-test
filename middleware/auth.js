const jwt = require("jsonwebtoken");

const AuthMiddleware = (req, res, next) => {
  const AuthHeader = req.headers.authorization;
  console.log(req.headers);
  if (!AuthHeader) {
    return res.status(401).send({ error: `missing Header` });
  }
  const [code, token] = AuthHeader && AuthHeader.split(" ");
  if (!token) {
    return res.status(401).send({ error: `Not Authorized` });
  }
  jwt.verify(token, process.env.JWT_SECRET, function (err, result) {
    if (err) {
      return res.status(403).send({ error: `Forbiden` });
    }
    if (result) {
      req.user = result.email;
      next();
    }
  });
};

module.exports = AuthMiddleware;
