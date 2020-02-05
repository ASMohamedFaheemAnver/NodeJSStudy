const User = require("../models/user");

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
  User.findById("5e37c3da14638353f844a639").then(user => {
    req.session.isLoggedIn = true;
    req.session.user = user;
    req.session.save(err => {
      if (err) {
        console.log(err);
      }
      res.redirect("/");
    });
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
