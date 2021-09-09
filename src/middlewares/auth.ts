import { Request, Response, NextFunction } from "express";
import UserModel from "../models/User";
import { verifyToken, getTokenFromReq } from "../utils/authToken";
import { CustomError } from "../utils/custom-error";

const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const token = getTokenFromReq(req);
        // console.log("token is", token);
        if (!token) {
            throw new CustomError(
                "Authentication token not found.",
                "BAD_TOKEN",
                401,
                {},
            );
        }

        const userId = verifyToken(token).id;
        if (!userId) {
            throw new CustomError(
                "Authentication token is invalid.",
                "BAD_TOKEN",
                401,
                {},
            );
        }
        //@ts-ignore
        req.user = {
            id: userId
        };

        next();
    } catch (error) {
        next(error);
    }
};

export default authMiddleware;
