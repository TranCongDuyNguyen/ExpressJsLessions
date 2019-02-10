const db = require('../db.js');

module.exports.index = (req, res) => {
	var page = parseInt(req.query.page) || 1;
	var perPage = 8;
	var begin = (page-1)*perPage;
	var end = page*perPage;
	res.render('product/index', {
		products: db.get('products').value().slice(begin,end),
		page: page
	});
	console.log(begin);
	console.log(end);
}