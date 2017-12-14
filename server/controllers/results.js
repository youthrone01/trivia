var mongoose = require('mongoose');
var User = mongoose.model("User");
var Question = mongoose.model("Question");
var Result = mongoose.model("Result");

module.exports = {
	get_results: function(req,res){
		Result.find({}).sort({score: 'desc'}).exec(function(err, results){
			if(err){
				console.log('can not get all result!!')
			}else{
				res.json(results)
			}
		})
	},
	create: function(req,res){
		console.log(req.body);
		var new_result = new Result(req.body);
		new_result.save(function(err){
			if(err){
				console.log('can not save result!!')
			}else{
				res.json({message:"success"});
			}
		})
	},

	search: function(req, res){
		Result.find({$or:[{name:{$regex:req.body.keyword}},
			{ "$where": "/"+req.body.keyword+"/.test(this.score)"},
		 { "$where": "/"+req.body.keyword +"/.test(this.percentage*100)"}
		]}).sort({score: 'desc'}).exec(function(err, results){
			if(err){
				console.log('can not get search result!!')
				console.log(err);
			}else{
				res.json(results);
			}
		})
	},
	
}
