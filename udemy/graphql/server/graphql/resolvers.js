const bcrypt = require("bcrypt");

const User = require("../model/user");

module.exports = {
  createUser: async function(/*args*/ { userInput }, req) {
    // const email = args.userInput.email;
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
