import mongoose from "mongoose";

const { Schema, model } = mongoose;

const mobileOTPSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600 // Document will be automatically deleted after 1 hour
    },
    expiresAt: {
        type: Date,
        required: true
    }
});

export default model('MobileOTP', mobileOTPSchema);
