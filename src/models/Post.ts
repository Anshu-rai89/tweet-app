import mongoose, { Schema, Types, model } from "mongoose";

interface IPost {
    content: string,
    userRef: Types.ObjectId
}

const postSchemaSchema = new Schema<IPost>({
    content: {
        type: String,
        required: true
    },
    userRef: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const Post = model<IPost>("User", postSchemaSchema);
export default Post