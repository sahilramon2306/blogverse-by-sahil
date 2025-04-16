const topicModel = require('../model/topic.js');
const userModel = require('../model/user.js');

//Create Topic
const createTopic = async (req, res) =>{
    const {email, topicname} = req.body;
    console.log(req.body);
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
        return res.status(200).json({ success: false, message: `This email is not registered, so you can't create topicname. Register first.`});
    }
    let newtopic = new topicModel({
        topicname : topicname
    });
    const existingTopic = await topicModel.findOne({ topicname : topicname});
    if (existingTopic) {
        return res.status(200).json({ success: false, message: "This topic name already exists. Please try a different one." });
    }

    await newtopic.save();
    res.status(200).send({success: true, message: "Topic name created successfully."});
}
//----------------------------------------------------------------------------------------------------------


//Update Topicname
const updateTopicname =  async (req, res) =>{
    const {id , topicname} = req.body;
    console.log(req.body);
    const existingtopicid = await topicModel.findOne({id : id});
    if (!existingtopicid) {
        return res.status(200).json({ success: false, message: `This topic id is not exists, so you can't update the topicname.`});
    }
    const existingTopic = await topicModel.findOne({ topicname : topicname});
    if (existingTopic) {
        return res.status(200).json({ success: false, message: "This topic name already exists. Please try a different one." });
    }
    const updatetopicname = await topicModel.findOneAndUpdate(
        { id : id },
        { $set: { topicname : topicname } },
        { new: true }
    );
    if (!updatetopicname) {
        return res.status(200).send({success: false, message: "Topicname not update."});
    }
    res.status(200).send({success: true, message: "Topicname updated.",updatetopicname});
}
//-------------------------------------------------------------------------------------------------------------

//Get all topic
const getAllTopic = async (req, res) => {
        const topics = await topicModel.find({}, { _id: 1, topicname: 1 }).lean();

        if (!topics.length) {
            return res.status(200).json({ success: false, message: "No topics found." });
        }
        // Transform topics array to only contain topic names
        //const topicNames = topics.map(topic => topic.topicname);

        res.status(200).json({ success: true, message: "Topics fetched successfully.", topics });
    } 

//-------------------------------------------------------------------------------------------------------------


module.exports = {
    createTopic : createTopic,
    updateTopicname : updateTopicname,
    getAllTopic : getAllTopic
}