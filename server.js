
var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require("body-parser");
var session = require('express-session');
app.listen(8000, function() {
 console.log("listening on port 8000");
});


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(session({secret: 'codingdojorocks'}));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, './static')));
app.use(express.static(path.join(__dirname, './public/dist')));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);