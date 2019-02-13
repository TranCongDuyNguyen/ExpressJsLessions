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
}

module.exports.addToCart = (req, res) => {
	var productId = req.params.productId;
	var sessionId = req.signedCookies.sessionId;
	if(!sessionId){
		res.redirect('/product');
		return;
	}
	db.get("session")
	.find({sessionId: sessionId})
	.set("cart." + productId, 1)
	.write();

}