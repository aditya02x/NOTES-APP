import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"The title is required"]
    },
    content:{
        type:String,
        required:[true,"The content is required"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

},{ timestamps: true });

export default  mongoose.model("Note",noteSchema)