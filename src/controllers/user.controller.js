import User from "../models/user.model.js"
import { errorHandler } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

export const test = (req, res) => {
    res.json({message: "Api is working!"})
}

export const updateUser = asyncHandler ( async (req, res, next) => {
    if(req.user._id !== req.params.userId) {
        return next(errorHandler(403, "You are not allowed to update current user"))
    }

    if (req.body.password) {
        if (req.body.password.length < 6) {
          return next(errorHandler(400, 'Password must be at least 6 characters'));
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
      }
    
    if(req.body.username) {
        if(req.body.username.length < 7 || req.body.username.length > 20) {
            return next(errorHandler(400, "Username must be between 7 and 20 characters"))
        }
    }

    if (req.body.username.includes(' ')) {
        return next(errorHandler(400, 'Username cannot contain spaces'));
    }

    if (req.body.username !== req.body.username.toLowerCase()) {
    return next(errorHandler(400, 'Username must be lowercase'));
    }

    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
    return next(errorHandler(400, 'Username can only contain letters and numbers'));
    }

    const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            profilePicture: req.body.profilePicture,
            password: req.body.password,
          },
        },
        { new: true }
      );

      const updatedLoggedInUser = await User.findById(updatedUser._id).select("-password")

      if(!updatedLoggedInUser) {
        return next(errorHandler(400, "There was an error while updating the user details"))
      }

      return res
                .status(200)
                .json(
                    new ApiResponse(
                        200, {
                        user: updatedLoggedInUser
                    }, 
                    "User updated successfully")
                )
})