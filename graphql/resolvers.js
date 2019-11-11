const User = require("../models/user");
const validator = require("validator");
const bcrypt = require("bcryptjs");

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
    }
};
