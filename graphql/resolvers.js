const User = require("../models/user");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_user:
        "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"
    }
  })
);

module.exports = {
  login: async function({ email, password }) {
    const errors = [];
    if (!validator.isEmail(email)) {
      errors.push({ message: "Email is invalid." });
    }
    if (!validator.isLength(password, { min: 3 })) {
      errors.push({ message: "Password is invalid." });
    }
    if (errors.length > 0) {
      const error = new Error("Invalid error.");
      error.data = errors;
      error.code = 422;
      throw error;
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("There is no such email in a database already.");
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Wrong password.");
      error.code = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString()
      },
      "superultra secret password omg lol yolo",
      { expiresIn: "1h" }
    );

    return {
      token: token,
      userId: user._id.toString()
    };
  },
  createUser: async function({ userInput }, req) {
    const { email, password } = userInput;

    const errors = [];
    if (!validator.isEmail(email)) {
      errors.push({ message: "Email is invalid." });
    }
    if (!validator.isLength(password, { min: 3 })) {
      errors.push({ message: "Password is invalid." });
    }

    if (errors.length > 0) {
      const error = new Error("Invalid error.");
      error.data = errors;
      error.code = 422;
      throw error;
    }

    const isExistingUser = await User.findOne({ email: email });
    if (isExistingUser) {
      const error = new Error("There is such email in a database already.");
      throw error;
    }
    const hashedPw = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      password: hashedPw
    });

    const createdUser = await user.save();

    return {
      ...createdUser._doc,
      _id: createdUser._id.toString()
    };
  },
  resetPassword: async function({ email }, req) {
    const errors = [];

    if (!validator.isEmail(email)) {
      errors.push({ message: "Invalid email" });
    }

    if (errors.length > 0) {
      const error = new Error("Invalid data");
      error.data = errors;
      error.code = 422;
      throw error;
    }

    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      const error = new Error("No such user in a database.");
      throw error;
    }

    const token = "3214567";
    existingUser.resetToken = token;
    existingUser.resetTokenExpiration = Date.now() + 3600000;
    await existingUser.save();

    transporter.sendMail({
      to: email,
      from: "itJobBoard@itboard.com",
      subject: "Reset password IT BOARD",
      html: `
              <p>You requested a password reset</p>
              <p>Click this <a href="http://localhost:3001/reset/${token}">link</a> to set a new password.</p>
              `
    });
    return { email: email };
  },
  addNewOffer: async function({ userInput }, req) {
    const { companyName, companyCity, jobTitle } = userInput;
    console.log("req.isAuth", req.isAuth);
    if (!req.isAuth) {
      const error = new Error("Not authenticated.");
      error.code = 401;
      throw error;
    }

    const errors = [];
    if (!validator.isLength(companyName, { min: 4 })) {
      errors.push({ message: "companyName is too short." });
    }
    if (!validator.isLength(companyCity, { min: 4 })) {
      errors.push({ message: "companyCity is too short." });
    }
    if (!validator.isLength(jobTitle, { min: 4 })) {
      errors.push({ message: "jobTitle is too short." });
    }

    if (errors.length > 0) {
      const error = new Error("Invalid error.");
      error.data = errors;
      error.code = 422;
      throw error;
    }
  }
};
