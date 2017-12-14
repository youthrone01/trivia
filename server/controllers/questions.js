var mongoose = require('mongoose');
var User = mongoose.model("User");
var Question = mongoose.model("Question");
var Result = mongoose.model("Result");

module.exports = {
	create: function(req,res){
		console.log(req.body);
		var question = new Question(req.body);
		question.save(function(err){
			if(err){
				res.json({message:"unsuccessful"})
			}else{
				res.json({message:"success"})
			}
		})
	},
	get_questions: function(req,res){
		Question.find({}, function(err, questions){
			if(err){
				console.log('Can not find questions');
			}else{
				for (var i = questions.length-1; i >=0; i--) {
					
					   var randomIndex = Math.floor(Math.random()*(i+1)); 
					   var itemAtIndex = questions[randomIndex];						
					   questions[randomIndex] = questions[i]; 
					   questions[i] = itemAtIndex;
				   }
				var  ques = questions.slice(0,4);
				console.log(ques);
				res.json(ques);
			}
		})
	},
	destroy: function(req,res){
		
	},
}
