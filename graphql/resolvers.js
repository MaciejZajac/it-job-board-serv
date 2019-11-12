const User = require("../models/user");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_user:
        "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"
    }
  })
);

module.exports = {
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
  resetPassword: function({ email }, req) {
    crypto.randomBytes(32, async (err, buffer) => {
      if (err) {
        const error = new Error("Something went wrong.");
        error.code = 500;
        throw error;
      }

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
      console.log("existingUser", existingUser);
      if (!existingUser) {
        const error = new Error("No such user in a database.");
        throw error;
      }

      const token = buffer.toString("hex");
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
      console.log("sendingmail...");
      console.log("email", email);
      return { email: email };
    });
  }
};
