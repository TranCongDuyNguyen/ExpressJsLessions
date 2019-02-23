const mongoose = require("mongoose");

var sessionSchema = new mongoose.Schema({
	//sessionId: String, -> ko muon
	cart: mongoose.Schema.Types.Mixed
})

var Session = mongoose.model("Session", sessionSchema, "sessions");

module.exports = Session;