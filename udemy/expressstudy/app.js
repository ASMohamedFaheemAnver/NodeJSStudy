// const http = require('http');

const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const path = require("path");
const errorsController = require("./controllers/errors");

// const db = require("./util/database");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");

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

app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
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

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

sequelize
  .sync()
  .then(_ => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: "RiFa", email: "jstrfaheem065@gmail.com" });
    }
    return Promise.resolve(user);
  })
  .then(_ => {
    const PORT = 3000;
    app.listen(PORT, () => {
      console.log("Server is running on : localhost:" + PORT);
    });
  })
  .catch(err => {
    console.log(err);
  });

// const server = http.createServer(app).listen(PORT);
