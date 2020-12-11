const express = require('express');
const path = require('path');
const routes = require('./routes/index');
const admin = require('./routes/admin');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('public'));

// app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/admin', admin);
app.use('/', routes);
module.exports = app;