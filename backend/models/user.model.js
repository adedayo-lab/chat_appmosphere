import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 25
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        maxLength: 14,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlenght: 7
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female"]
    },
    profilePic: {
        type: String,
        default: "",
    },
},
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;