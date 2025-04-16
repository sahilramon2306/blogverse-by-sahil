const userController = require("../controller/user");
const auth = require("../middleware/auth.js")

//set Rotes for User routers
const setRouter=(app)=>{
    app.post(`/registration`,userController.registration);
    app.post(`/login`,userController.login);
    app.post('/update-password',auth.isAuthenticate,userController.updatePassword)
}

module.exports={
    setRouter:setRouter
}