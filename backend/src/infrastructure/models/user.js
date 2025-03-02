import mongoose from "mongoose";

const { Schema, model } = mongoose;

const UserSchema = new Schema({
    name: { type: String },
    email: { type: String, unique: true, sparse: true },
    password: { type: String,  },
    mobile: {
        type: String,
        trim: true,
        sparse: true
    },
    mobileVerified: {
        type: Boolean,
        default: false
    },
    verified: { type: Boolean, default: false },
});

export default model("User", UserSchema);
