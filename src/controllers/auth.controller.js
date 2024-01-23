import {errorHandler} from "../utils/ApiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import User from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import bcryptjs from "bcryptjs"

const signup = asyncHandler( async (req, res, next) => {
    const {username, email, password} = req.body

    if(
        [username, email, password].some((field) => field?.trim() === "")
    ) {
        return res.status(400).json({message: "All fields are required"})

    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if(existedUser) {
        // next(errorHandler(409, false, "User with this email or username already exist"))
        return res.status(400).json({success: false, message: "User with this email or username already exist"})
    }

    const encryptedPassword = bcryptjs.hashSync(password, 10)

    const user = await User.create({
        username: username?.toLowerCase(),
        email,
        password: encryptedPassword
    })

    const createdUser = await User.findById(user._id)?.select("-password")

    if(!createdUser) {
       next(errorHandler(500, "Something went wrong while registering the user"))
    }
 
    return res.status(201).json(
        new ApiResponse(200, createdUser , "User registered successfully")
    )
})

export {signup}