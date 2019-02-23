const User = require("../models/users.model");

module.exports.requireAuth = (req, res, next) => {
	//check cookie id which provided when user login
	if(!req.signedCookies.sessionId){
		res.redirect("/auth/login");
		return;
	}
	//prevent fake cookie-id

	var user = User.findOne({_id: req.signedCookies.sessionId});
	if(!user){
		res.redirect("/auth/login");
		return;
	}

	res.locals.user = user; // this variable is available to any views in this req-res section
	next();
}