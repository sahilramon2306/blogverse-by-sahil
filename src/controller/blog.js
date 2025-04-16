const blogModel = require('../model/blog.js');
const userModel = require('../model/user.js');

//Create Topic
const createBlog = async (req, res) =>{
    const { topicid, title, content} = req.body;
    console.log(req.user);
    const userId = req?.user?.id;
    const existingUserid = await userModel.findOne({ _id :userId});
    if (!existingUserid) {
        return res.status(200).json({ success: false, message: `This user id : ${userId}, is not exist in db, so you can't create blog.`});
    }
    
    let newblog = new blogModel({
        topicid : topicid,
        title :  title, 
        content :  content, 
        userid : userId
    });

    const d=await newblog.save();
    res.status(200).send({success: true, message: "Blog create succesfully.."})
}
//-------------------------------------------------------------------------------------------------------------

//Update Blog
const updateBlog =  async (req, res) =>{
    const {blogid, content} = req.body;
    console.log(req.body);
    const existingblogid = await blogModel.findOne({_id : blogid});
    if (!existingblogid) {
        return res.status(200).json({ success: false, message: `This blog id : ${blogid} is not exists in db, so you can't update the blog..`});
    }
    const updateblog = await blogModel.findOneAndUpdate(
        { _id : blogid },
        { $set: { content : content } },
        { new: true }
    );
    if (!updateblog) {
        return res.status(200).send({Success: false, message: "Blog not update."});
    }
    res.status(200).send({success: true, message: "Blog update successfull.",updateblog});
}
//--------------------------------------------------------------------------------------------------------------

//Get all blog
const getAllBlogs = async (req, res) => {
        let { page = 1, limit = 10 } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);

        const totalBlogs = await blogModel.countDocuments(); // Get total count
        const blogs = await blogModel.find().skip((page - 1) * limit).limit(limit);

        if (!blogs.length) {
            return res.status(200).json({ success: false, message: "No blogs found." });
        }

        res.status(200).json({success: true, message: "Blogs fetched successfully.", totalPages: Math.ceil(totalBlogs / limit), currentPage: page, blogs});
    } 


//----------------------------------------------------------------------------------------------------------------

//Get blog by blogid
const getBlogByBlogid = async (req, res) =>{
    const {blogid}= req.body;
  // token verification ------------

    console.log(req.body);
    const blogdata = await blogModel.findOne({_id : blogid});
    if (!blogdata) {
        return res.status(200).json({ success: false, message: `This blog id : ${blogid} is not exists in db.`});
    }
    res.status(200).send({success: true, message: "Blog data fetch successfully.", blogdata});
}
//----------------------------------------------------------------------------------------------------------------

//Get all blog of a particular user
const getAllBlogOfaParticularUser = async (req, res) => {
        const { userid } = req.body;
        let { page = 1, limit = 10 } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);

        const totalBlogs = await blogModel.countDocuments({ userid });
        const userBlogs = await blogModel.find({ userid }).skip((page - 1) * limit).limit(limit);

        if (!userBlogs.length) {
            return res.status(200).json({ success: false, message: `No blogs found for user ID: ${userid}.` });
        }

        res.status(200).json({success: true, message: `Blogs fetched successfully for user ID: ${userid}.`, totalPages: Math.ceil(totalBlogs / limit), currentPage: page, userBlogs });
    } 

//----------------------------------------------------------------------------------------------------------------

//Get all blog of a particular topic
const getAllBlogOfaParticularTopic = async (req, res) => {
        const { title } = req.body;
        let { page = 1, limit = 10 } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);

        console.log(req.body);

        // Count total blogs for the topic
        const totalBlogs = await blogModel.countDocuments({ title });

        // Fetch paginated blogs
        const topicblogdata = await blogModel.find({ title }).skip((page - 1) * limit).limit(limit);

        if (!topicblogdata.length) {
            return res.status(200).json({ success: false, message: `No blogs found for topic: ${title}.` });
        }

        res.status(200).send({success: true, message: `Topic: ${title}, blog data fetched successfully.`, totalPages: Math.ceil(totalBlogs / limit), currentPage: page, topicblogdata });
    } 

//-------------------------------------------------------------------------------------------------------------


module.exports = {
    createBlog : createBlog,
    updateBlog : updateBlog,
    getAllBlogs : getAllBlogs,
    getBlogByBlogid : getBlogByBlogid,
    getAllBlogOfaParticularUser : getAllBlogOfaParticularUser,
    getAllBlogOfaParticularTopic : getAllBlogOfaParticularTopic
}