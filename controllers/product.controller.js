const db = require('../db.js');

module.exports.index = (req, res, next) => {
	var page = parseInt(req.query.page) || 1;

	var perPage = 8;
	var begin = (page-1)*perPage;
	var end = page*perPage;

	res.render('product/index', {
		products: db.get('products').value().slice(begin,end),
		page: page
	});
	next();
}

module.exports.addToCart = (req, res) => {
	//create and increase product count in db
	var productId = req.params.productId;
	var sessionId = req.signedCookies.sessionId;
	if(!sessionId){
		res.redirect('/product');
		return;
	}

	var count = db.get("session")
				.find({sessionId: sessionId})
				.get("cart." + productId, 0)
				.value();

	db.get("session")
	.find({sessionId: sessionId})
	.set("cart." + productId, 1 + count)
	.write();
	//get the counts from db
	var currentSession = db.get("session")
				.find({sessionId: sessionId})
				.value();
	var currentCart = currentSession.cart;
	var ccount = 0;
	for( var propName in currentCart){

		if(currentCart.hasOwnProperty(propName)){
			var propValue = currentCart[propName];
			ccount += propValue;
		}
	}
	//re-render page
	var page = parseInt(req.query.page) || 1;
	var perPage = 8;
	var begin = (page-1)*perPage;
	var end = page*perPage;

	res.render('product/index', {
		products: db.get('products').value().slice(begin,end),
		page: page,
		cartcount: ccount});
}



	
	
