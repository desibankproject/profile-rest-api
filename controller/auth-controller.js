var jwt  = require('jsonwebtoken'); // used to create, sign, and verify tokens
var ProfileEntity=require('../model/profile-entity')
var RESTAPI=require('../config/rest-api-constant');
//Here we have to write logic to generate token using jsonwebtoken module!
module.exports.authUser=(req,res)=> {
    //var login={username:"jack",password:"jill"};
    var data=req.body; 
    var pusername=data.username;
    var ppassword=data.password;
   ProfileEntity.find({username:pusername,password:ppassword})
   .then(profile => {
       console.log(profile);//profile=[];
       if(profile.length>0) {
           console.log("+_+__data is coming from the database!!!!!!!!!!!!!");
           console.log(profile);
         
				  //Here we have to write code to generate the token
		  const payload = {username: pusername};
          //var SALT ='IhateCat&Olive';
          var token = jwt.sign(payload, RESTAPI.TOKEN_SALT,{				
              expiresIn: 60*60*24 // expires in 24 hours				      
          });
           return res.status(200).send({role:"customer",authToken:token,status:"success",message:"username and password are correct!."});
       }else{
            console.log("#)#)#)#)User does not exist#)#)#)#)");   
            console.log(profile);
            return res.status(200).send({status:"fail",message:"username and password are not correct!."});
       }
   }).catch(err => {
       console.log("#)#)#)#ERROR)#)#)#");
       console.log(err);
       return res.status(500).send({status:"fail",message:"Sorry! there is some problem to process the request."});
   });

}


   //Here we are passing data as query string
   //?sno=re3030303
   module.exports.findImageById=function(req,res){
    //var _id=req.query.id;
    var _id=req.params.mid;
    console.log("nagendra = "+_id);
    if(_id==undefined){
        return;
    }
     console.log("____Accessing the rowdi  _id = "+_id);

    ProfileEntity.findById(_id)
        .then(profile => {
            if(profile) {
                console.log("+_+__data is coming from the database!!!!!!!!!!!!!");
                console.log(profile);
                //what you are writting into the response
                res.contentType(profile.photo.contentType);
                //here in response we are writting only
               return res.send(profile.photo.data);          
            }
        }).catch(err => {
            console.log("#)#)#)#ERROR)#)#)#");
            console.log(err);
            //if(err.kind === 'ObjectId') {
              //  return res.status(404).send({});                
           // }
            return res.status(500).send({ });
        });
}