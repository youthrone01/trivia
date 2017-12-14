var mongoose = require('mongoose');
var User = mongoose.model("User");
var Question = mongoose.model("Question");
var Result = mongoose.model("Result");
module.exports = {
	login: function(req,res){
		User.findOne({email: req.body.email}, function(err, user){
			if(err){
				console.log("login error found");
			}else{
				if(user == null){
					res.json({message:"Cann't find this email!", user:null})
				}else{
					if(user.password == req.body.password){
						res.json({message:"success", user:user})
					}else{
						res.json({message:"The password is incorrect!", user:null})
					}
				}
			}
		})
	},
	create: function(req,res){
		User.findOne({email: req.body.email}, function(err, user){
			if(err){
				console.log("register error found");
			}
			else{
				if(user == null){
					var new_user = new User(req.body);
					new_user.save(function(err, user){
						if(err){
							console.log("can not save new user");
						}else{
							res.json({message:"success", user:user});
						}
					})
				}else{
					res.json({user:null, message:"registered"})
				}
			}
		})
	},
	// update: function(req,res){
	// 	Player.findOne({_id: req.params.playerid},function(err,player){
	// 		if(err){
	// 			console.log("Finding Player Error:", err);
	// 			res.json({err:err});
	// 		}
	// 		else{
	// 			console.log(typeof(req.body.status))
	// 			let game = player.game.slice();
	// 			game[req.params.game-1] = req.body.status;
	// 			player.game = game;
	// 			player.save(function(err){
	// 				if(err){
	// 					console.log("Save Error: ", err);
	// 					res.json({err:err});
	// 				}
	// 				else{
	// 					// console.log("player: ",player);
	// 					res.redirect(303,'/players');
	// 				}
	// 			});
	// 		}
	// 	});
	// },
	// destroy: function(req,res){
	// 	Player.remove({_id: req.params.id},function(err){
	// 		if(err){
	// 			console.log("Delete Error: ",err);
	// 			res.json({error:err});
	// 		}
	// 		res.redirect(303,'/players');
	// 	})
	// }
}
