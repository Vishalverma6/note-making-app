const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
    },
    audioTranscription:{
        type:String,
    },
    imageUrl:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    favorite:{
        type:Boolean,
        default:false,
    },
})


module.exports = mongoose.model("Note",noteSchema);