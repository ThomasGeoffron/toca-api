const { verifyJwt } = require("../helpers/jwt");

const auth = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).send("Missing token, couldn't authenticate");
  }
  try {
    const user = verifyJwt(token);
    req.user = user;
  } catch (err) {
    console.log(err);
    return res.status(401).send("Invalid token, couldn't authenticate");
  }

  return next();
};

module.exports = auth;
