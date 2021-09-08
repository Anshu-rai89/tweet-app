import { Router, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import validate from "../utils/schema/validate-schema";
import registerSchema from "../utils/schema/resigterSchema";
import UserModel from "../models/User";
import { signToken } from "../utils/authToken";
import { CustomError } from "../utils/custom-error";
const router = Router();

router.post(
    "/register",
    validate(registerSchema.user),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await registerUser(req.body);
            res.status(201).json({ success: true, data: data });
        } catch (error) {
            next(error);
        }
    },
);

const registerUser = async ({
    name,
    email,
    password,
}: {
    name: string;
    email: string;
    password: string;
}) => {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = await new UserModel({
        name,
        email,
        password: passwordHash,
    });

    const token = signToken({ id: user._id, name: user.name, email: user.email });
    await user.save();
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        token: token
    }
};

router.post(
    "/login",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await loginUser(req.body);
            res.status(201).json({ success: true, data: data });
        } catch (error) {
            next(error);

        }
    },
);

const loginUser = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}) => {
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new CustomError("User does not exist", "BAD_INPUT", 400, {});
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword)
        throw new CustomError("User Password Incorrect", "BAD_INPUT", 400, {});

    const token = signToken({ id: user._id, name: user.name, email: user.email });
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        token: token
    }
};
export default router;
