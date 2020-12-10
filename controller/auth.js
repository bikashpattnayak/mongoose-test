const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

class AuthController {
  login = async (req, res, next) => {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email: email });
    bcrypt.compare(password, foundUser.password, function (err, result) {
      if (err) {
        return next(err);
      }
      if (result) {
        jwt.sign(
          { email },
          process.env.JWT_SECRET,
          { expiresIn: 160 },
          function (err, token) {
            res.status(200).send({ auth: token });
          }
        );
      } else {
        next(new Error("some issue"));
      }
    });
  };

  register = async (req, res, next) => {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email: email });
    console.log();
    if (foundUser) {
      return res.status(409).send({ error: "User Already exists" });
    }
    bcrypt.hash(password, 10, async function (err, result) {
      const newUser = new User({ email, password: result });
      const response = await newUser.save();
      res.status(201).send({ email: response.email, success: true });
    });
  };
}

module.exports = new AuthController();
