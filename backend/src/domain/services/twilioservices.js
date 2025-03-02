import twilio from 'twilio';
import bcrypt from "bcrypt";
import MobileOTPModel from '../../infrastructure/models/mobileotp.js'

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export const sendSMS = async (to, message) => {
    try {
        const result = await client.messages.create({
            body: message,
            from: twilioPhoneNumber,
            to: to
        });
        return result;
    } catch (error) {
        console.error('Twilio SMS Error:', error);
        throw new Error('Failed to send SMS');
    }
};


export const sendMobileOTP = async (user_id, mobileNumber) => {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
        const hashedOTP = await bcrypt.hash(otp, 4);

        await MobileOTPModel.updateOne(
            { _id: user_id },
            {
                otp: hashedOTP,
                createdAt: Date.now(),
                expiresAt: Date.now() + 3600000,
            },
            { upsert: true }
        );

        await sendSMS(
            mobileNumber,
            `Your UniHox_Task verification code is: ${otp}. This code will expire in 10 minutes. Don't share this code with anyone; our employees will never ask for the code.`
        );
    } catch (e) {
        console.error(e);
        throw e;
    }
};
