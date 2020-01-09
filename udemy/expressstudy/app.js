// const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const path = require('path');
const errorsController = require('./controllers/errors');

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
app.set('view engine', 'ejs');

// Where we can find the dynamic html files
app.set('veiws', 'views');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', adminRoutes);

app.use(shopRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.use(errorsController.pageNotFound);

const PORT = 3000;
app.listen(PORT, () => {
    console.log('Server is running on : localhost:' + PORT);
});
// const server = http.createServer(app).listen(PORT);