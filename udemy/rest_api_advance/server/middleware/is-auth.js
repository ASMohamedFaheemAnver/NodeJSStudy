const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorizaition");
  const token = req.get("Authorizaition").split(" ")[1];
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
