const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

const path = require("path");
const errorsController = require("./controllers/errors");

const User = require("./models/user");

const csrf = require("csurf");

const flash = require("connect-flash");
const multer = require("multer");

const app = express();

app.set("view engine", "ejs");

// Where we can find the dynamic html files
app.set("veiws", "views");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "|" + file.originalname.toLowerCase());
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
const mongoose = require("mongoose");

const session = require("express-session");

const MongoDbStore = require("connect-mongodb-session")(session);

const MONGODB_URI = "mongodb://localhost:27017/shop";

const store = new MongoDbStore({
  uri: MONGODB_URI,
  collection: "sessions"
});

const csrfProtection = csrf();
app.use(flash());

app.use(
  session({
    secret: "i_use_rifa_to_secure",
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(csrfProtection);

app.use((req, res, next) => {
  res.locals.isAuthendicated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use((req, res, next) => {
  if (req.session.user) {
    return User.findById(req.session.user._id)
      .then(user => {
        if (!user) {
          return next();
        }
        req.user = user;
        next();
      })
      .catch(err => {
        console.log(err);
        next(new Error(err));
      });
  }
  next();
});

app.use("/admin", adminRoutes);

app.use(shopRoutes);

app.use(authRoutes);

app.get("/500", errorsController.internalServerError);
app.use(errorsController.pageNotFound);

app.use((error, req, res, next) => {
  console.log(error);
  res.status(500).render("500", {
    pageTitle: "INTERNAL SERVER ERROR!",
    path: "/page-not-found",
    isAuthendicated: req.session.isLoggedIn,
    csrfToken: req.csrfToken()
  });
});

const PORT = 3000;

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  // .then(async _ => {
  //   const user = await User.findOne();
  //   if (!user) {
  //     const user_1 = new User({
  //       name: "rifa",
  //       email: "jstrfaheem065@gmail.com",
  //       items: []
  //     });
  //     return user_1.save();
  //   }
  // })
  .then(_ => {
    app.listen(PORT, () => {
      console.log("Server is running on : localhost:" + PORT);
    });
  })
  .catch(err => {
    console.log(err);
  });
