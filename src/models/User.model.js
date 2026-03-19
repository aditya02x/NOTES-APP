import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"The username is required"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"The email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"The password is required"]
    }
},{ timestamps: true });



export default mongoose.model("User",userSchema)