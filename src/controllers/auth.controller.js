import {ApiError} from "../utils/ApiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import User from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import bcryptjs from "bcryptjs"

const signup = asyncHandler( async (req, res) => {
    const {username, email, password} = req.body

    if(
        [username, email, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if(existedUser) {
        throw new ApiError(409, "User with this email or username already exist")
    }

    const encryptedPassword = bcryptjs.hashSync(password, 10)

    const user = await User.create({
        username: username?.toLowerCase(),
        email,
        password: encryptedPassword
    })

    const createdUser = await User.findById(user._id)?.select("-password -refreshToken")

    if(!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )
})

export {signup}