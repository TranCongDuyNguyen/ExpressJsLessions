const db = require("../db.json");
module.exports.index = (req, res) => {
	res.render("user/login");
}

module.exports.postCreate = (req, res, next) => {
	var errors = [];
	var email = req.body.email;
	var pw = req.body.pw;
	var user = db.get('users').find({pw: pw}).value();

	if(!user){
		errors.push("User does not exist");
		res.render("user/login", {errors: errors, values: req.body});
		return;
	} 
	var user = db.get('users').find({pw: pw}).value();
	if(!user){
		errors.push('Wrong password');
		res.render("user/login", {errors: errors, values: req.body});
		return;
	}

	res.redirect("user");
	next();
}