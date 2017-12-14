var users = require('../controllers/users.js');
var questions = require('../controllers/questions.js');
var results = require('../controllers/results.js');
var path = require('path');

module.exports = function(app){
	app.post('/users', (req,res)=>{users.create(req,res)});
	app.post('/login', (req,res)=>{users.login(req,res)});
	app.post('/questions', (req,res)=>{questions.create(req,res)} );
	app.get('/questions', (req,res)=>{questions.get_questions(req,res)} )
	app.post('/results', (req,res)=>{results.create(req,res)});
	app.get('/results', (req,res)=>{results.get_results(req,res)});
	app.post('/results/search', (req,res)=>{results.search(req,res)});
	
	app.all("*",function(req,res){
		res.sendFile('index.html', { root: './public/dist' });
	})
}