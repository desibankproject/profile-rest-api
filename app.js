//this is starting point of the program!
//I have to configure Node.js as a server
var express = require('express'); //we have just installed
var http = require('http'); //This comes with Node.js
var bodyParser=require('body-parser');

const fileUpload = require('express-fileupload');

var app = express(); //Instantiating Express
app.set('port', process.env.PORT || 4000);
//To read data from incoming html form
//do not forget this
app.use(bodyParser.urlencoded({ extended: false }));

//to read json data from request body 
app.use(express.json());

// default options
//This is VVI to upload a file
app.use(fileUpload());

//Mapping static resource
app.use('/',express.static(__dirname + '/public'));

//var mongoconn=require('./utils/mongodb-utils');
//mongoconn();
require('./utils/mongodb-utils')();
//Calling the router function
require('./router/profile-router')(app);

//Hey create one http server using app setting on which 
//port number define inside express!
http.createServer(app).listen(app.get('port'), function(){
    console.log('...........NodeJS server listening on port.......... ' + app.get('port'));
    console.log('...........NodeJS server listening on port.......... ' + app.get('port'));
    console.log('...........NodeJS server listening on port.......... ' + app.get('port'));
    console.log('...........NodeJS server listening on port.......... ' + app.get('port'));
   
});
