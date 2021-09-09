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
}, { timestamps: true })

const Post = model<IPost>("Post", postSchemaSchema);
export default Post