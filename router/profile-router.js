
var ProfileController=require('../controller/profile-controller')
module.exports=function(uriMapping){

    //Mapping for add profile
    uriMapping.post("/profiles",ProfileController.uploadProfile);
    uriMapping.get("/profiles",ProfileController.showProfiles);
    uriMapping.get("/profiles/image/:mid",ProfileController.findImageById);
    uriMapping.delete("/profiles/:mid",ProfileController.deleteProfileById);
    uriMapping.post("/login",ProfileController.authUser);
    uriMapping.get("/sprofiles",ProfileController.findProfiles);    
    
};
