import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from '../../infrastructure/models/user.js';  
import OTPModel from '../../infrastructure/models/otp.js'; 
import MobileOTPModel from '../../infrastructure/models/mobileotp.js';
import dotenv from "dotenv";
import { sendMobileOTP } from '../../domain/services/twilioservices.js'
import { sendOTP } from "../../domain/services/AuthService.js";

dotenv.config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET; // Use from .env

// Add mobile number to user account
router.post("/add-mobile", async (req, res) => {
    try {
        const { name, mobile } = req.body; 

        const mobileRegex = /^\+[1-9]\d{1,14}$/;

        if (!mobileRegex.test(mobile)) {
            return res.status(400).json({ message: "Invalid mobile number format. Use format (+91 234567890)" });
        }

        if ( !name) {
            return res.status(400).json({
                status: "FAILED",
                message: "Name is required.",
            });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ mobile });

        if (existingUser) {
            return res.status(403).json({ 
                status: "FAILED", 
                message: "Mobile Number already registerd." 
            });
        } else  {
             var user = await userModel.create({
                    name,
                    mobile,
                    email:`Empty_email_from_unihox${mobile}`,
                    verified: false,
                });
            }

        await sendMobileOTP(user._id, mobile);

        res.json({
            status: "SUCCESS",
            message: "OTP sent successfully",
            user: user
        });
    } catch (e) {
        console.error("Error in /add-mobile:", e);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Verify mobile OTP
router.post("/verify-mobile", async (req, res) => {
    try {
        const { mobile, otp, userId } = req.body;

        const user = await userModel.findOne({
            $or: [{ _id: userId }, { mobile: mobile }]
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const verificationRecord = await MobileOTPModel.findOne({ _id: user._id });
        if (!verificationRecord) {
            return res.status(401).json({ message: "Invalid OTP" });
        }

        const { expiresAt, otp: hashedOTP } = verificationRecord;

        if (expiresAt < Date.now()) {
            await MobileOTPModel.deleteMany({ _id: user._id });
            return res.status(401).json({ message: "OTP has expired" });
        }

        const validateOTP = await bcrypt.compare(otp, hashedOTP);
        if (!validateOTP) {
            return res.status(401).json({ message: "Invalid OTP" });
        }

        // user.mobileVerified = true;
        // await user.save();

        // Mark user as verified if not already
        if (!user.mobileVerified) {
            await userModel.updateOne({ _id: user._id }, { mobileVerified: true });
        }

        await MobileOTPModel.deleteMany({ _id: user._id });

        // res.json({
        //     status: "SUCCESS",
        //     message: "Mobile number verified successfully"
        // });

 // Generate JWT token
 const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET, { expiresIn: "1h" });
 res.json({
    status: "SUCCESS",
     token,
     message: "Login successful",
 });

    } catch (e) {
        console.error("Error in /verify-mobile:", e);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Request new mobile OTP
router.post("/request-mobile-otp", async (req, res) => {
    try {
        const { mobile } = req.body;

        if ( !mobile) {
            return res.status(404).json({ message: "Please enter mobile number" });
        }
        const mobileRegex = /^\+[1-9]\d{1,14}$/;

        if (!mobileRegex.test(mobile)) {
            return res.status(400).json({ message: "Invalid mobile number format. Use format (+91 234567890)" });
        }

        const user = await userModel.findOne({ mobile: mobile });

        if (!user || !user.mobile) {
            return res.status(404).json({ message: "User number not found" });
        }

        await sendMobileOTP(user._id, user.mobile);
        res.json({ message: "OTP sent successfully" });
    } catch (e) {
        console.error("Error in /request-mobile-otp:", e);
        res.status(500).json({ message: "Internal server error" });
    }
});


// Login with Password Route
router.post("/password", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(403).json({ message: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(403).json({ message: "Invalid password" });
        }
        
        const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET);

        res.json({
            token,
            message: "Login successful",
        });

    } catch (e) {
        res.status(500).json({
            message: "Internal server error",
            error: e.message
        });
    }
});

// Request OTP Route
router.post("/request-otp", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        let user = await userModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        await sendOTP(user._id, email);

        res.json({ message: "OTP sent successfully" });

    } catch (e) {
        console.error("Error in /signin/request-otp:", e);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/otp", async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Fetch OTP using user ID
        const verificationRecord = await OTPModel.findOne({ _id: user._id });

        if (!verificationRecord) {
            return res.status(401).json({ message: "Invalid OTP" });
        }

        const { expiresAt, otp: hashedOTP } = verificationRecord;

        if (expiresAt < Date.now()) {
            await OTPModel.deleteMany({ _id: user._id });
            return res.status(401).json({ message: "OTP has expired" });
        }

        const validateOTP = await bcrypt.compare(otp, hashedOTP);

        if (!validateOTP) {
            return res.status(401).json({ message: "Invalid OTP" });
        }

        // Mark user as verified if not already
        if (!user.verified) {
            await userModel.updateOne({ _id: user._id }, { verified: true });
        }

        await OTPModel.deleteMany({ _id: user._id }); // Remove OTP after use

        // Generate JWT token
        const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET, { expiresIn: "1h" });
        res.json({
            token,
            message: "Login successful",
        });

    } catch (e) {
        console.error("Error in /signin/otp:", e);
        res.status(500).json({ message: "Internal server error" });
    }
});


export default router;
