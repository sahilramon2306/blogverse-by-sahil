const topicController = require("../controller/topic");
const auth = require("../middleware/auth.js")

//set Rotes for Topic routers
const setRouter=(app)=>{
    app.post(`/create-Topic`,auth.isAuthenticate,topicController.createTopic);
    app.post(`/update-Topicname`,auth.isAuthenticate,topicController.updateTopicname);
    app.get(`/get-Alltopic`,auth.isAuthenticate,topicController.getAllTopic);
}

module.exports={
    setRouter:setRouter
}