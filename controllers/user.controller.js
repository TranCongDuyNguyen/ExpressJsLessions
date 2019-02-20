const db = require('../db.js');
const shortid = require('shortid');

module.exports.index = (req,res) => {
	res.render('user/index', { users: db.get('users').value() });
	//console.log(req.cookies);
};

module.exports.search = (req,res) => {
	var q = req.query.q; //req.query is an object with a pair key-value: q-value, query is a part of path which come after '?'
	var matchedUsers = db.get('users')
							.value()
							.filter(x => x.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);
	res.render('user/index',{users: matchedUsers});
};

module.exports.getCreate = (req,res) => {
	res.render('user/create');
};

module.exports.viewUser = (req,res) => {
	var id = req.params.id;
	res.render('user/view',{user: db.get('users').find({id: id}).value()});
};

module.exports.postCreate = (req,res) => {
	req.body.id = shortid.generate();
	req.body.avatar = req.file.path.split("\\").slice(1).join("/");

	db.get('users').push(req.body).write();
	res.redirect('/user');

};

