var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
	first_name: {type: String, require: true},
	last_name: {type: String, require: true},
	email:{type: String, require: true, index: { unique: true }},
	password: {type: String, require: true },
},{timestamps: true})

mongoose.model('User',UserSchema)