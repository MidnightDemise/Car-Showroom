import mongoose, { Schema, models } from "mongoose";


const commentSchema = new Schema({

    user: {
        type: String,
        required: true,
    },
    commentDescription: {
        type: String,

    }
})


const Comment = models.Comment || mongoose.model("Comment" , commentSchema)
export default Comment;

