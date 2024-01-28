import {errorHandler} from "./ApiError.js"
import jwt from 'jsonwebtoken'
import { asyncHandler } from "./asyncHandler.js"

export const verifyToken = asyncHandler( (req, res, next) => {
    const token = req.cookies.accessToken

    if(!token) {
        return next(errorHandler(401, "Unauthorized"))
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) {
            return next(errorHandler(401, "Unauthorized"))
        } 

        req.user = user
        next()
    })
})