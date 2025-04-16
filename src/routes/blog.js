const blogController = require("../controller/blog.js");
const auth = require("../middleware/auth.js")

//set Rotes for Topic routers
const setRouter=(app)=>{
    app.post(`/create-Blog`,auth.isAuthenticate,blogController.createBlog);
    app.post(`/update-Blog`,auth.isAuthenticate,blogController.updateBlog);
    app.get(`/get-allblogs`,auth.isAuthenticate,blogController.getAllBlogs);
    app.post(`/getBlog-By-Blogid`,auth.isAuthenticate,blogController.getBlogByBlogid);
    app.post(`/get-all-blog-of-a-particular-user`,auth.isAuthenticate,blogController.getAllBlogOfaParticularUser);
    app.post(`/get-all-blog-of-a-particular-topic`,auth.isAuthenticate,blogController.getAllBlogOfaParticularTopic);
}

module.exports={
    setRouter:setRouter
}