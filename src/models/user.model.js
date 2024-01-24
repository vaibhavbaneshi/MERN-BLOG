import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken"

const userSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true
        },

        email: {
            type: String,
            unique: true,
            required: true
        },

        password: {
            type: String,
            required: true
        }
    }, {timestamps: true}
)

userSchema.methods.generateAccessToken = function() {
    return jwt.sign({
        _id: this._id,
        email: this.email,
    }, 
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign({
        _id: this._id
    },
        process.env.REFRESH_TOKEN_SECRET,
       {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
       }
    ) 
}

const User = mongoose.model('User', userSchema)

export default User