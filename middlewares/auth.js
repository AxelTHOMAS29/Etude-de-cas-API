const UnauthorizedError = require("../errors/unauthorized");
const jwt = require("jsonwebtoken");
const User = require("../api/users/users.model");
const config = require("../config");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) throw "Token manquant";

    const decoded = jwt.verify(token, config.secretJwtToken);
    if (!decoded || !decoded.userId) throw "Token invalide";

    const user = await User.findById(decoded.userId, "-password");
    if (!user) throw "Utilisateur non trouvé";

    req.user = user;
    next();
  } catch (err) {
    next(new UnauthorizedError(err));
  }
};
