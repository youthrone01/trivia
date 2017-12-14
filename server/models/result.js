var mongoose = require('mongoose');

var ResultSchema = mongoose.Schema({
	name: {type: String, require: true},
	score: {type: Number, require: true},
	percentage:{type: Number, require: true},
},{timestamps: true})

mongoose.model('Result',ResultSchema)