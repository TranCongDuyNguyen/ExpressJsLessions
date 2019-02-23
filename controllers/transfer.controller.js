
const Transfer = require("../models/transfers.model");

const shortid = require('shortid');

module.exports.index = (req, res) => {

	res.render("transfer/create", {
		csrfToken: req.csrfToken()
	});
}

module.exports.postCreate = async function(req, res){ 
	var data = {
		"account": req.body.account,
		"amount": parseInt(req.body.amount),
		"userId": req.signedCookies.sessionId
	};
	await Transfer.create(data);
	res.render("transfer/create");
}