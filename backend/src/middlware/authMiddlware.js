var jwt = require('jsonwebtoken');
const authenticateUser = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(403).send({ status: false, msg: "fabrication error" })
    }
    const tokenData = await jwt.verify(authorization, "login");

req.id = tokenData.user
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Unauthorized access. token expired.',
    });
  }
};
module.exports = { authenticateUser }