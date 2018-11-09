
var ProfileEntity=require('../model/profile-entity')
var randomstring = require("randomstring");
module.exports.uploadProfile=function(req, res) {

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let pphoto = req.files.photo;
    console.log("Printing the image!!!!!!!!!!!!!");
    console.log(pphoto.data); //image as a byte array
    var fileName=pphoto.name; // name of the image to be uploaded
    console.log("__)@)@(@(@(@*(@*@*@*@*  = "+req.body.name);
    console.log("__)@)@(@(@(@*(@*@*@*@*  fileName = "+fileName);
  
    // Use the mv() method to place the file somewhere on your server
    pphoto.mv(__dirname+"/images/"+fileName, function(err) {
      if (err){
        console.log(err);  
        res.status(500).json({status:"fail",message:"Sorry!! your profile is not created"}); 
      }else{   
    
      var profile=req.body;
     console.log("mobile - "+profile.mobile);
     console.log(profile);  
     //This is instance mongoose schema
     var pentity =new ProfileEntity();
     pentity.name=profile.name;
     pentity.username=profile.name;
     pentity.password="test@123";
     pentity.email=profile.email;
     pentity.gender=profile.gender;
     pentity.mobile=profile.mobile;
     //pentity.photo=profile.photo;
     var  pid=randomstring.generate(7);
     pentity.pid=pid;
     pentity.photo.data = pphoto.data;
     pentity.photo.contentType = 'image/png';
            pentity.save(function(err){
                console.log("Saving data into database .....");
                console.log(pentity);
                if(err){
                    console.log("CAUSE OF THE PROBLEM!");
                    console.log(err);
                    res.status(200).json({status:"fail",message:"Sorry!! your profile is not created"}); 
                }else{
                    
                    res.status(200).json({status:"success",message:"Hey! your profile is uploaded successfully!"}); 
                 }
            });   
          }
    });
  }


  module.exports.showProfiles=(req,res)=> {
    console.log(")@@@@@@@@@students@@@@@@@@@@@@@@@"); 
   //var students = [];    
   ProfileEntity.find({},function(err,data){
          console.log(data);
          res.status(200).json(data);
   });   
}

   //Here we are passing data as query string
   //?sno=re3030303
   module.exports.findImageById=function(req,res){
        var _id=req.query.id;
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



  module.exports.deleteProfileById=function(req,res){
      // var _id=req.query.sno;
       //req.params.noteId
       console.log("_@)@)@)@)@)DELETING THE PROFILE WITH PROFILE ID  ="+req.query.id+" @)@)@)@)@)@)@)@)");
       ProfileEntity.findByIdAndRemove(req.query.id)
                    .then(profile => {
                        if(!profile) {
                            return res.status(404).send({
                                status:"fail",
                                message: "Profile not found with id " + req.query.sno
                            });
                        }
                        res.status(200).send({ status:"success",message: "Profile deleted successfully!"});
                    }).catch(err => {
                        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                            return res.status(404).send({
                                status:"fail",
                                message: "Profile not found with id " + req.query.sno
                            });                
                        }
                        return res.status(500).send({
                            status:"fail",
                            message: "Could not delete profile with id " + req.query.sno
                        });
                     });
}