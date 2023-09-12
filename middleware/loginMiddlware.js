import Joi from "joi";
import jwt from 'jsonwebtoken'
const userRegisterSchema = Joi.object({
    username: Joi.string().trim().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(30).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    // .regex(/^[^\s]+$/, 'username required do not allow empty space')
})

export const userRegisterData = (req, res, next) => {

    const { error } = userRegisterSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    console.log("register middlware")
    next();
}

const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(30).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()

})

export const userLoginData = (req, res, next) => {
    const { error } = userLoginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    console.log("login middlware")
    next();
}

export const verifyToken = (req, res, next) => {
    const bearerHeader = req.header('Authorization')
    if (!bearerHeader) {
        return res.status(401).json({ error: 'Access denied. No token provided or invalid' });
    }
    const token = bearerHeader.split(' ')[1];
    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        req.userId = decoded.userId;
        next()
    })
}
