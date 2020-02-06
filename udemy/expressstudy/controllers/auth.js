const User = require("../models/user");
const bcrypt = require("bcryptjs");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.getLogin = (req, res, next) => {
  let errorMessage = req.flash("error");
  if (errorMessage.length > 0) {
    errorMessage = errorMessage[0];
  } else {
    errorMessage = null;
  }
  res.render("auth/login", {
    path: "/login",
    pageTitle: "LOGIN",
    errorMessage: errorMessage
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        req.flash("error", "Invalid email or password!");
        return res.redirect("/login");
      }

      bcrypt.compare(password, user.password).then(result => {
        if (!result) {
          req.flash("error", "Invalid email or password!");
          return res.redirect("/login");
        }
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.save(err => {
          if (err) {
            console.log(err);
          }
          res.redirect("/");
        });
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
  let errorMessage = req.flash("error");
  if (errorMessage.length > 0) {
    errorMessage = errorMessage[0];
  } else {
    errorMessage = null;
  }
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "SIGNUP",
    errorMessage: errorMessage
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirm_password = req.body.confirm_password;

  User.findOne({ email: email })
    .then(user => {
      if (user) {
        req.flash("error", "E-mail exist already!");
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
          const msg = {
            to: email,
            from: "rifa@support.com",
            subject: "RiFa shoping side!",
            html: "<strong>and easy to do anywhere, even with Node.js</strong>"
          };
          return sgMail.send(msg);
        })
        .then(result => {
          // console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
};
