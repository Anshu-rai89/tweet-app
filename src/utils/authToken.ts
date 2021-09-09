import { Request } from "express";
import jwt from "jsonwebtoken";
import { CustomError } from "./custom-error";
import dotenv from 'dotenv';

dotenv.config({ path: ".env" });
const JWT_SECRET = process.env.JWT_SECRET || "";
export const signToken = (
    payload: Record<string, unknown>
): string =>
    jwt.sign(payload, JWT_SECRET, {
        expiresIn: "1d"
    });

export const verifyToken = (token: string): Record<string, unknown> => {
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        if (typeof payload === "object") {
            return payload as Record<string, unknown>;
        }
        throw new Error();
    } catch (error) {
        throw new CustomError(
            "Authentication token is invalid.",
            "BAD_TOKEN",
            401,
            {},
        );
    }
};

export const getTokenFromReq = (req: Request): string | null => {
    const token = req.get("Authorization") || "";
    return token ? token : null;
};