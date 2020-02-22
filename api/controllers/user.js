const jwt = require("jsonwebtoken");
const { SUCCESS, ERROR } = require("../../utils/helper");
const { JWT_SECRET } = require("../../utils/contants");

module.exports.login = function(req, res) {
  const token = jwt.sign(
    {
      username: req.body.username,
      password: req.body.password,
      timestamp: new Date() / 1000
    },
    JWT_SECRET,
    {
      expiresIn: "1d"
    }
  );

  SUCCESS(res, { token });
};
