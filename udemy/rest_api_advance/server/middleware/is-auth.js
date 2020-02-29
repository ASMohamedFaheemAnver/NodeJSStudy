const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorizaition");
  if (!authHeader) {
    const error = new Error("Not authendicated!");
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, "i_use_rifa_to_secure");
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    const error = new Error("Not authendicator!");
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
};
