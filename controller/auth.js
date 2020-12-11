const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const Joi = require("joi");

class AuthControllerPayLoadSchema {
  loginSchema() {
    return Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(7).required(),
    });
  }
}

class AuthController {
  login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const val = await new AuthControllerPayLoadSchema()
      .loginSchema()
      .validateAsync({ email, password });
    const foundUser = await User.findOne({ email: email });
    const result = await bcrypt.compare(password, foundUser.password);

    if (result) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60,
      });

      res.status(200).send({ auth: token });
    } else {
      next(new Error("some issue"));
    }
  });

  register = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const val = await new AuthControllerPayLoadSchema()
      .loginSchema()
      .validateAsync({ email, password });
    const foundUser = await User.findOne({ email1: email });
    if (foundUser) {
      return res.status(409).send({ error: "User Already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashPassword });
    const response = await newUser.save();
    res.status(201).send({ email: response.email, success: true });
  });

  // middlewareAsync(handler) {
  //   return async (req, res, next) => {
  //     try {
  //       await handler(req, res);
  //     } catch (e) {
  //       next(e);
  //     }
  //   };
  // }
}

module.exports = new AuthController();
