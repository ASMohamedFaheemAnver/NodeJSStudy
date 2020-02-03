const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

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
  User.findByPk("5e368c3ce02ebd25a0a1ad9b")
    .then(user => {
      req.user = new User(user.username, user.email, user.cart, user._id);
      next();
    })
    .catch(err => {
      console.log(err);
    });
});

app.use("/admin", adminRoutes);

app.use(shopRoutes);

app.use(express.static(path.join(__dirname, "public")));

app.use(errorsController.pageNotFound);

const PORT = 3000;

mongoose
  .connect("mongodb://localhost:27017/shop", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(_ => {
    app.listen(PORT, () => {
      console.log("Server is running on : localhost:" + PORT);
    });
  })
  .catch(err => {
    console.log(err);
  });
