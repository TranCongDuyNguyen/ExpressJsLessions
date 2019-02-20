db = require("../db.js");

const shortid = require('shortid');

module.exports.index = (req, res) => {

	res.render("transfer/create", {
		csrfToken: req.csrfToken()
	});
}

module.exports.postCreate = (req, res) => {
	req.body.id = shortid.generate();
	var data = {
		"id": req.body.id,
		"account": req.body.account,
		"amount": parseInt(req.body.amount),
		"userId": req.signedCookies.sessionId
	}
	db.get("transfer").push(data).write();
	res.render("transfer/create");
}