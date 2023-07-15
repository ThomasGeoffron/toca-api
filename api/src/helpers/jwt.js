const jwt = require("jsonwebtoken");

const generateToken = (jwtProps) => {
  const token = jwt.sign(
    {
      id: jwtProps.id,
      company: jwtProps.company,
      email: jwtProps.email,
      isAdmin: jwtProps.isAdmin,
      appSecret: jwtProps.appSecret,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "3000h",
    }
  );
  return token;
};

const verifyJwt = (token) => {
  return jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
};

module.exports = { generateToken, verifyJwt };
