
import joi from "joi";
const user = joi.object({
    name: joi.string().min(2).required(),
    email: joi.string().email(),
    password: joi.string().min(6).max(1024).required()
});

export default {
    user
}