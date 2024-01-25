import {errorHandler} from "../utils/ApiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import User from "../models/user.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import bcryptjs from "bcryptjs"

const generateAccessandRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}
    } catch (error) {
        res.status(error.statusCode).json({
            success: error.success,
            message: error.message
        })
    }
}

const signup = asyncHandler( async (req, res, next) => {
    const {username, email, password} = req.body

    if(
        [username, email, password].some((field) => field?.trim() === "")
    ) {
        return next(errorHandler(409, false, "All fields are required"))
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if(existedUser) {
        return next(errorHandler(409, false, "User with this email or username already exist"))
        // return res.status(400).json({success: false, message: "User with this email or username already exist"})
    }

    const encryptedPassword = bcryptjs.hashSync(password, 10)

    const user = await User.create({
        username: username?.toLowerCase(),
        email,
        password: encryptedPassword
    })

    const createdUser = await User.findById(user._id)?.select("-password")

    if(!createdUser) {
       return next(errorHandler(500, false, "Something went wrong while registering the user"))
    }
 
    return res.status(201).json(
        new ApiResponse(200, createdUser , "User registered successfully")
    )
})

const signin = asyncHandler(async (req, res, next) => {
    const {email, password} = req.body

    if(
        [email, password].some((field) => field?.trim() === "")
    ) {
        return res.status(400).json({message: "All fields are required"})
    }

    const validUser = await User.findOne({email})

    if(!validUser) {
        return next(errorHandler(400, false,"User not found"))
    }

    const validUserPassword = validUser.password

    if(!(bcryptjs.compareSync(password, validUserPassword))) {
        return next(errorHandler(400, false,"Incorrect Password"))
    }

    const {accessToken, refreshToken} = await generateAccessandRefreshToken(validUser._id)

    const loggedInUser = await User.findById(validUser._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
    }

    return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200, {
                        user: loggedInUser, accessToken, refreshToken
                    },
                    "User logged in successfully"
                )
            )
})

const googleAuth = asyncHandler( async (req, res, next) => {
    const {name, email, googlePhotoUrl} = req.body

    const user = await User.findOne({ email })
    
    if(user) {
        const {accessToken, refreshToken} = await generateAccessandRefreshToken(user._id)
    
        const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    
        const options = {
            httpOnly: true,
        }

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200, {
                        user: loggedInUser, accessToken, refreshToken
                    },
                    "User logged in successfully"
                )
            )
    }

    else {
        const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10)
        const newUser = await User.create({
            username: name?.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
            email,
            password: hashedPassword,
            profilePicture: googlePhotoUrl
        })

        const {accessToken, refreshToken} = await generateAccessandRefreshToken(newUser._id)

        const loggedInUser = await User.findById(newUser._id).select("-password")

        // const { password, ...rest} = newUser._doc

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200, {
                        user: rest, accessToken, refreshToken
                    },
                    "User logged in successfully"
                )
            )
    }
})

export {
    signup,
    signin,
    googleAuth
}