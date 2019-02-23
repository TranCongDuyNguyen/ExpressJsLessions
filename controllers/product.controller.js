
const Product = require('../models/products.model');
const Session = require('../models/sessions.model');

var obj = require("../middlewares/session.mdw");

var ccount = 0;

module.exports.index = async function(req, res, next){
	var page = parseInt(req.query.page) || 1;

	var perPage = 8;
	var begin = (page-1)*perPage;
	var end = page*perPage;

	var products = await Product.find();
	var productsPP = products.slice(begin, end);
	res.render('product/index', {
		products: productsPP,
		page: page,
		cartcount: ccount
	})
	next();
}
// get empty object to update document in db each cookie
var update = obj.update;
update.cart = {};
module.exports.addToCart = async function(req, res){
	//create and increase product count in db
	var productId = req.params.productId;
	var sessionId = req.signedCookies.sessionId;

	if(!sessionId){
		res.redirect('/product');
		return;
	}
	
	if(!update.cart[productId]){
		update.cart[productId] = 1;
	}
	else{
		update.cart[productId] += 1;
	}
	console.log(update.cart);
	await Session.updateOne({_id: sessionId},
							{$set: {cart: update.cart}});
	//get cart counts in db
	var session = await Session.findById(sessionId);
	var currentCart = session.cart;
	ccount = 0;
	for (var prop in currentCart){
		if(currentCart.hasOwnProperty(prop)){
			var propVal = currentCart[prop];
			ccount += propVal;
		}
	}


	res.redirect('/product');
	
	

	/* var count = db.get("session")
				.find({sessionId: sessionId})
				.get("cart." + productId, 0)
				.value();

	db.get("session")
	.find({sessionId: sessionId})
	.set("cart." + productId, 1 + count)
	.write(); */

	//get the counts from db
	/*var currentSession = db.get("session")
			.find({sessionId: sessionId})
			.value();
	
	var currentCart = currentSession.cart;
	ccount = 0;

	for( var propName in currentCart){
		if(currentCart.hasOwnProperty(propName)){
			var propValue = currentCart[propName];
			ccount += propValue;
		}
	}*/
	

}



	
	
