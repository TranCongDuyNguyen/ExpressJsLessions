require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const shortid = require('shortid');
const csurf =require('csurf');
const mongoose = require('mongoose');

const db = require('./db.js');

const userRoute = require('./routes/user.route.js');
const authRoute = require('./routes/auth.route.js');
const productRoute = require('./routes/product.route.js');
const transferRoute = require('./routes/transfer.route');

const authMiddleware = require('./middlewares/auth.mdw.js');
const sessionMiddleware = require('./middlewares/session.mdw');

const app = express();
const port = 3000;
app.listen(port, () => console.log('OK!'));

app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser('askndaskjndakndakdnasdjn'));
app.use(sessionMiddleware.func);
app.use(csurf({ cookie: true })); // this function should be used after cookie-parser initalization

app.set('views', './views');
app.set('view engine', 'pug');

mongoose.connect(process.env.mongo_url);

//app.get('/',(req,res) => res.render('index'));

app.use('/user', authMiddleware.requireAuth,  userRoute);
app.use('/auth', authRoute);
app.use('/product', sessionMiddleware.func, productRoute);
app.use('/transfer', authMiddleware.requireAuth, transferRoute);

