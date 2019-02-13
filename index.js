require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const shortid = require('shortid');

const db = require('./db.js');

const userRoute = require('./routes/user.route.js');
const authRoute = require('./routes/auth.route.js');
const productRoute = require('./routes/product.route.js');

const authMiddleware = require('./middlewares/auth.mdw.js');
const sessionMiddleware = require('./middlewares/session.mdw');

const app = express();
const port = 3000;
app.listen(port, () => console.log('OK!'));

app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser('askndaskjndakndakdnasdjn'));
app.use(sessionMiddleware);

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/',(req,res) => res.render('index'));

app.use('/user', authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/product', productRoute);

