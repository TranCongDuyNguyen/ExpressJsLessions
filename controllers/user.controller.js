const User = require('../models/users.model');

module.exports.index = async function(req,res){
	var users = await User.find();
	res.render('user/index', { users: users });
	//console.log(req.cookies);
};

module.exports.search = async function(req,res){
	var q = req.query.q; //req.query is an object with a pair key-value: q-value, query is a part of path which come after '?'
	var users = await User.find();
	var matchedUsers = users.filter( x => x.name.toLowerCase().indexOf(q.toLowerCase()) !== -1); 
	res.render('user/index',{users: matchedUsers});
};

module.exports.getCreate = (req,res) => {
	res.render('user/create');
};

module.exports.viewUser = async function(req,res){
	var id = req.params.id;
	var users = await User.findById(id);
	res.render('user/view',{user: users});
};

module.exports.postCreate = async function(req,res){
	//req.body.id = shortid.generate();
	req.body.avatar = req.file.path.split("\\").slice(1).join("/");
	User.create(req.body);
	res.redirect('/user');
};

