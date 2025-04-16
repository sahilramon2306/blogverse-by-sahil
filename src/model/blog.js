const mongoose=require('mongoose')
  
Schema=mongoose.Schema
let blogSchema=new Schema({
    topicid:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true
    },
    userid:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
})
module.exports = mongoose.model('blog', blogSchema);
