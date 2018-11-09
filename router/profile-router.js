
var ProfileController=require('../controller/profile-controller')
module.exports=function(app){

    //Mapping for add profile
    app.post("/profile-upload",ProfileController.uploadProfile);

    app.get("/profiles",ProfileController.showProfiles);

    app.get("/image-loader",ProfileController.findImageById);

    app.get("/delete-profile",ProfileController.deleteProfileById);

    
    
};
