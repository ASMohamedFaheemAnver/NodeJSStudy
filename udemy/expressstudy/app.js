// const http = require('http');

const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const path = require("path");
const errorsController = require("./controllers/errors");

const User = require("./models/user");

// const db = require("./util/database");
// const hbs = require('express-handlebars');

const app = express();

// app.engine('hbs', hbs({
//     extname: 'hbs',
//     defaultLayout: 'main-layout',
//     layoutsDir: __dirname + '/views/layouts/',
// }));

// Let express to use handle bar

// Compile with dynamic engine pug
// app.set('view engine', 'pug');

// Compile with dynamic engine handlebar
// app.set('view engine', 'hbs');
app.set("view engine", "ejs");

// Where we can find the dynamic html files
app.set("veiws", "views");

// db.execute("SELECT * FROM products")
//   .then(result => {
//     console.log(result[0]);
//   })
//   .catch(err => {
//     console.log(err);
//   });

app.use(bodyParser.urlencoded({ extended: false }));
const mongoConnect = require("./util/database").mongoConnect;

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

mongoConnect(() => {
  app.listen(PORT, () => {
    console.log("Server is running on : localhost:" + PORT);
  });
});

// const server = http.createServer(app).listen(PORT);
