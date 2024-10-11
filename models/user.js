import mongoose from "mongoose";

const user = mongoose.Schema({
    name: String,
    email:{
        type : String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        select: false
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

export const User = mongoose.model("User", user)