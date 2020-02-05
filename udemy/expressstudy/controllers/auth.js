const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  // req.isLoggedIn =
  //   req
  //     .get("Cookie")
  //     .split(";")[3]
  //     .split("=")[1] === "true";
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthendicated: req.session.isLoggedIn
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let oUser;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.redirect("/login");
      }
      oUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.redirect("/login");
      }
      req.session.isLoggedIn = true;
      req.session.user = oUser;
      req.session.save(err => {
        if (err) {
          console.log(err);
        }
        res.redirect("/");
      });
    })
    .catch(err => {
      console.log(err);
      res.redirect("/login");
    });
};

exports.getLogout = (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
};

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAuthendicated: req.session.isLoggedIn
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirm_password = req.body.confirm_password;
  User.findOne({ email: email })
    .then(user => {
      if (user) {
        return res.redirect("/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user_1 = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] }
          });
          return user_1.save();
        })
        .then(_ => {
          res.redirect("/login");
        });
    })
    .catch(err => {
      console.log(err);
    });
};
