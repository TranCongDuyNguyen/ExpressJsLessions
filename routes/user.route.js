var express = require('express');
var multer  = require('multer')
var router = express.Router();
//const cookieParser = require('cookie-parser');


var upload = multer({ dest: './public/uploads/' })
//router.use(cookieParser()); 

const controllers = require('../controllers/user.controller.js');

const validates = require('../validates/user.validate.js'); //validate user's typings


/* router.get('/cookie',(req,res) => {
	res.cookie("session-id", 12345);
	res.send("i'm a cookie");
})*/

router.get('/', controllers.index);
router.get('/search', controllers.search);
router.get('/create', controllers.getCreate);
router.get('/:id', controllers.viewUser);


router.post('/create',
	upload.single('avatar'),
	validates.postCreate, 
	controllers.postCreate
);


module.exports = router;