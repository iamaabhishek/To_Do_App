import { text } from "express";
import mongoose, { Types } from "mongoose";

const TodoSchema = new mongoose.Schema({
    text:{
        type : String,
        required : true
    },
    complete: {
        type: Boolean

    }
}) 





const Todo = mongoose.model("Todo",TodoSchema);
export default Todo;







