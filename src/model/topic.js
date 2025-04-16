const mongoose=require('mongoose')
  
Schema=mongoose.Schema
let topicSchema=new Schema({
    topicname:{
        type:String,
        required:true
    }
})
module.exports = mongoose.model('topic', topicSchema);

