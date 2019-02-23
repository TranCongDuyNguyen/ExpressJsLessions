var Session = require("../models/sessions.model");
var update = {};

module.exports.func = async function(req, res, next){
	if(!req.signedCookies.sessionId){
		var currentSession = new Session();
		await currentSession.save();
		update = {};
		res.cookie("sessionId", currentSession.id, {signed: true});
	}
	next();
}

module.exports.update = update;