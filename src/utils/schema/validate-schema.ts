import { AnySchema } from "joi";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../custom-error";

const validate =
    (schema: AnySchema) =>
        async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            try {
                await schema.validateAsync(req.body);
                return next();
            } catch (error) {
                const err = new CustomError("Validation Failure.", "BAD_INPUT", 400, {});
                next(err);
            }
        };
export default validate;
