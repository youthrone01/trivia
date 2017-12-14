var mongoose = require('mongoose');

var QuestionSchema = mongoose.Schema({
	content: {type: String, minlength:15, require: true},
    answer: {type: String,  require: true},
    fake_one: {type: String, require: true},
    fake_two: {type: String,  require: true},
    fake_three: {type: String,  require: true},
},{timestamps: true})

mongoose.model('Question',QuestionSchema)