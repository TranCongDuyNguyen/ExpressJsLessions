const mongoose = require("mongoose");

var transferSchema = new mongoose.Schema({
	account: String,
	amount: Number,
	userId: String
})

var Transfer = mongoose.model("Transfer", transferSchema, "transfers");

module.exports = Transfer;