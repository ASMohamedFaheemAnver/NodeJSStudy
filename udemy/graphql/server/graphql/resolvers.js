const bcrypt = require("bcrypt");
const validator = require("validator");

const User = require("../model/user");

module.exports = {
  createUser: async function(/*args*/ { userInput }, req) {
    // const email = args.userInput.email;
    const errors = [];
    if (!validator.isEmail(userInput.email)) {
      errors.push({ message: "Email is invalid!" });
    }
    if (
      validator.isEmpty(userInput.password) ||
      !validator.isLength(userInput.password, { min: 5 })
    ) {
      errors.push({ message: "Password is too short!" });
    }
    if (errors.length > 0) {
      const error = new Error("Invalid input!");
      error.data = errors;
      error.code = 422;

      throw error;
    }

    const existingUser = await User.findOne({ email: userInput.email });
    if (existingUser) {
      const error = new Error("User exists!");
      throw error;
    }

    const hash = await bcrypt.hash(userInput.password, 12);
    const user = new User({
      email: userInput.email,
      name: userInput.name,
      password: hash
    });

    const createdUser = await user.save();
    return { ...createdUser._doc, _id: createdUser._id.toString() };
  }
};
