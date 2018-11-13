
var AuthController=require('../controller/auth-controller')
module.exports=function(app){
    app.post("/login",AuthController.authUser); 
    app.get("/profiles/image/:mid",AuthController.findImageById);

};
