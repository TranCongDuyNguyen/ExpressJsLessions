const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid');

const db = require('./db.js');
const userRoute = require('./routes/user.route.js');


const app = express();
const port = 3000;
app.listen(port, () => console.log('OK!'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/',(req,res) => res.render('index'));

app.use('/user', userRoute);
