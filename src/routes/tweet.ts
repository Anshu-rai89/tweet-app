import { Router, Request, Response, NextFunction } from "express";
import validate from "../utils/schema/validate-schema";
import registerSchema from "../utils/schema/resigterSchema";
import TweetModel from "../models/Post";
import UserModel from "../models/User";
import { Types } from "mongoose";
import { CustomError } from "../utils/custom-error";
const router = Router();

router.post(
    "/create",
    validate(registerSchema.tweet),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            //@ts-ignore
            const data = await createTweet(req.body, req.user.id);
            res.status(201).json({ success: true, data: data });
        } catch (error) {
            next(error);
        }
    },
);

router.get(
    "/all",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            //@ts-ignore
            const data = await getTweet(req.user.id);
            res.status(200).json({ success: true, data: data });
        } catch (error) {
            next(error);
        }
    },
);

const createTweet = async ({ content, userRef }: { content: string, userRef: Types.ObjectId }) => {
    const user = await UserModel.findById(userRef);

    if (!user) {
        throw new CustomError("User does not exist", "BAD_INPUT", 400, {});
    }
    const tweet = await TweetModel.create({ content, userRef });

    user.tweets.push(tweet._id);
    await user.save();
    return tweet;


}

const getTweet = async ({ userRef }: { userRef: Types.ObjectId }) => {
    const user = await UserModel.findById(userRef);

    if (!user) {
        throw new CustomError("User does not exist", "BAD_INPUT", 400, {});
    }
    const tweet = await TweetModel.find({ userRef: { $in: user.following } });
    return tweet;

}

export default router;