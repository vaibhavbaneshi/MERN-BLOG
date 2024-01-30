import {errorHandler} from "./ApiError.js"
import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    console.log("accessToken", req.cookies.accessToken);
    const token = req.cookies.accessToken

    if(!token) {
        return next(errorHandler(401, false, "Access Token is not present"))
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) {
            return next(errorHandler(401, false, "Unauthorized"))
        } 

        req.user = user
        next()
    })
}