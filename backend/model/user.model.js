import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type : String,
        required : true
    },
    email: {
        type: String,
        default: true,
        unique: true       
    },
    password: {
        type: String,
        required: true,
        select: false        
    },
    token: {
        type:String  
    }
}) 



const user = mongoose.model("user",userSchema);
export default user;


