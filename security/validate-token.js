//var salt ='IhateCat&Olive';
var jwt  = require('jsonwebtoken'); // used to create, sign, and verify tokens
var RESTAPI=require('../config/rest-api-constant');
module.exports = function(endPoint) {
	//use - means it is working as filter
	endPoint.use(function(req, res, next) {
		   console.log("##########################");
		   console.log("from header" + req.headers['user-access-token']);
		   ////[{"key":"user-access-token","value":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hZ2VuZHJhLnN5bmVnaXN0aWNpdEBnbWFpbC5jb20iLCJwYXNzd29yZCI6ImppbGwiLCJpYXQiOjE1MjY2ODUyNjcsImV4cCI6MTUyNjc3MTY2N30.bTAs6s5J3opxnLw5r5NK_Af_FcKcKav_Cm3yvqZ709I","description":""}]
          //Reading token from incoming request header! 
          var token = req.headers['user-access-token'];
		  console.log("token : " + token);
		  // decode token
		  if (token) {
				    // verifies secret and checks exp
				      jwt.verify(token, RESTAPI.TOKEN_SALT, function(err, decoded) {
				    	  	  console.log("jwt printing decoded token!!!!!!!!!!!!!!!");
						      console.log(decoded); 
						      if (err) {
						        return res.json({ success: false, message: 'Failed to authenticate token.' });    
						      } else {
						        // if everything is good, save to request for use in other routes
						        req.decoded = decoded;  
						        //chain.doFilter();
						        next();  //go ahead and access your resource 
				   			}
		    		});
		  } else {
			  return res.json({ status: 'failed', message: 'No token Found in the header!' });
		  }
		});
};