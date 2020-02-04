const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

const path = require("path");
const errorsController = require("./controllers/errors");

const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");

// Where we can find the dynamic html files
app.set("veiws", "views");

app.use(bodyParser.urlencoded({ extended: false }));

const mongoose = require("mongoose");

app.use((req, res, next) => {
  User.findById("5e37c3da14638353f844a639").then(user => {
    req.user = user;
    next();
  });
});

app.use("/admin", adminRoutes);

app.use(shopRoutes);

app.use(authRoutes);

app.use(express.static(path.join(__dirname, "public")));

app.use(errorsController.pageNotFound);

const PORT = 3000;

mongoose
  .connect("mongodb://localhost:27017/shop", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(async _ => {
    const user = await User.findOne();
    if (!user) {
      const user_1 = new User({
        name: "rifa",
        email: "jstrfaheem065@gmail.com",
        items: []
      });
      return user_1.save();
    }
  })
  .then(_ => {
    app.listen(PORT, () => {
      console.log("Server is running on : localhost:" + PORT);
    });
  })
  .catch(err => {
    console.log(err);
  });
