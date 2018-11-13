//this is starting point of the program!
//I have to configure Node.js as a server
var express = require('express'); //we have just installed
var http = require('http'); //This comes with Node.js
var bodyParser=require('body-parser');
var RESTAPI=require('./config/rest-api-constant');
const fileUpload = require('express-fileupload');
var https = require('https');
var fs = require('fs');


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

//profile-mapping file contains function definition 
var endPoint = express.Router();
//Filter 
endPoint.use(function (err, req, res, next) {
	/* We log the error internaly */
    console.log(err);
	/*
     * Remove Error's `stack` property. We don't want
     * users to see this at the production env
     */
    if (req.app.get('env') !== 'development') {
        delete err.stack;
    }
	/* Finaly respond to the request */
    var  data={status:"fail",message:"Sorry, request could not process successfully."};
    res.status(err.statusCode || 500).json(data);
});
require('./utils/mongodb-utils')();
//Calling the router function
require('./router/profile-router')(endPoint);
//here endpoint will be prefix with  v1
app.use(RESTAPI.REST_VERSION, endPoint);


//Hey create one http server using app setting on which 
//port number define inside express!
http.createServer(app).listen(app.get('port'), function(){
    console.log('...........NodeJS server listening on port.......... ' + app.get('port'));
    console.log('...........NodeJS server listening on port.......... ' + app.get('port'));
    console.log('...........NodeJS server listening on port.......... ' + app.get('port'));
    console.log('...........NodeJS server listening on port.......... ' + app.get('port'));
   
});
var sslOptions = {
    key: fs.readFileSync('./ssl/server.key'),
    cert: fs.readFileSync('./ssl/server.crt')
  };

 https.createServer(sslOptions,app).listen(9000, function(){
    console.log('...........NodeJS server listening on port..........9000 ' );
    console.log('...........NodeJS server listening on port.......... 9000');
    console.log('...........NodeJS server listening on port..........9000 ');
    console.log('...........NodeJS server listening on port.......... 9000');
});





