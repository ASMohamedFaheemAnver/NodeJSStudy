const User = require("../models/user");
const bcrypt = require("bcryptjs");
const sgMail = require("@sendgrid/mail");
const crypto = require("crypto");

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

exports.getReset = (req, res, next) => {
  let errorMessage = req.flash("error");
  if (errorMessage.length > 0) {
    errorMessage = errorMessage[0];
  } else {
    errorMessage = null;
  }
  res.render("auth/reset", {
    path: "/reset",
    pageTitle: "RESET PASSWORD",
    errorMessage: errorMessage
  });
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          req.flash("error", "No account with that email!");
          return res.redirect("/reset");
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save().then(result => {
          res.redirect("/");
          const msg = {
            to: req.body.email,
            from: "rifa@support.com",
            subject: "Password reset",
            html: `<p>You requested a password reset</p>
          <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password</p>`
          };
          return sgMail.send(msg);
        });
      })
      .catch(err => {
        console.log(err);
      });
  });
};

exports.getNewPassword = (req, res, next) => {
  const token = req.params.token;
  User.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() }
  })
    .then(user => {
      if (user) {
        let errorMessage = req.flash("error");
        if (errorMessage.length > 0) {
          errorMessage = errorMessage[0];
        } else {
          errorMessage = null;
        }
        res.render("auth/new-password", {
          path: "/new-password",
          pageTitle: "NEW PASSWORD",
          errorMessage: errorMessage,
          userId: user._id.toString(),
          passwordToken: token
        });
      }
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;

  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() },
    _id: userId
  })
    .then(user => {
      bcrypt
        .hash(newPassword, 12)
        .then(hashedPassword => {
          user.password = hashedPassword;
          user.resetToken = undefined;
          user.resetTokenExpiration = undefined;
          return user.save();
        })
        .then(result => {
          res.redirect("/login");
        });
    })
    .catch(err => {
      console.log(err);
    });
};
