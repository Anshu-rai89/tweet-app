import { ErrorRequestHandler } from "express";
import { CustomError } from "../utils/custom-error";

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {

    const isSafeError = error instanceof CustomError;

    const clientError = isSafeError
        ? error
        : {
            message: "Something went wrong.",
            code: "INTERNAL_ERROR",
            status: 500,
            data: {},
        };
    res.status(clientError.status).send({ success: false, error: clientError });
};
