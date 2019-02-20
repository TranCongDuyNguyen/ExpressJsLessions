module.exports.postCreate = (req, res, next) => {
	var errors = [];
	if(!req.body.name)
		errors.push('Please enter your name');
	if(!req.body.phone)
		errors.push('Please enter your phone');
	if(errors.length){
		res.render('user/create', {errors: errors, 
									values: req.body}); // keep displaying name, phone after reloading page
		return;
	}
	
	next();
}