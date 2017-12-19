var mongoose = require('mongoose');
var User = mongoose.model("User");
var Question = mongoose.model("Question");
var Result = mongoose.model("Result");
var request = require('request');
var cheerio = require('cheerio');

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
				
				res.json(ques);
			}
		})
	},
	get_online_questions: function(req, res){
		var res_questions = [];
		var page_num = Math.floor(Math.random()*20+1)
		var page = ""+page_num
		if (page.length < 2){
			page = "0"+page
		}
		console.log(page)
		var url = 'http://global.oup.com/uk/orc/sociology/fulcher4e/01student/mcqs/ch'+page
		request(url, function(err, response, html){
			if (err){
				console.log('err')
			}else{
				var $ = cheerio.load(html);
				$('#mcqs').filter(function(){
					var data = $(this);
					data.children('div').each(function(i, elem){
						var dic = {};
						dic.content = $(this).children('p').text()
						dic.answer = $(this).children('div').eq(0).find("label").clone().children().remove().end().text();
						dic.fake_one =  $(this).children('div').eq(1).find("label").clone().children().remove().end().text();
						dic.fake_two =  $(this).children('div').eq(2).find("label").clone().children().remove().end().text();
						dic.fake_three =  $(this).children('div').eq(3).find("label").clone().children().remove().end().text();
						res_questions.push(dic);
					})
					console.log(res_questions)
					res.json(res_questions);
				})
			}
		})
		
	},


}
