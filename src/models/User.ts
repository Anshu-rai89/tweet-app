import { Schema, Types, model } from "mongoose";

interface IUser {
    name: string,
    email: string,
    password: string,
    tweets: Array<Types.ObjectId>,
    following: Array<Types.ObjectId>
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tweets: [
        {
            type: Types.ObjectId,
            ref: "Tweets"
        }
    ],
    following: [
        {
            type: Types.ObjectId,
            ref: "User"
        }
    ]
})

const User = model<IUser>("User", userSchema);
export default User