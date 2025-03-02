import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle, FaApple } from "react-icons/fa";
import yoga from "../assets/image.png"
import { toast } from "react-toastify";

function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [userInfo,setUserInfo]=useState();
  const otpInputsRef = useRef([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [signupMethod, setSignupMethod] = useState("email");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    
    if (signupMethod === "email" && (!formData.email || !formData.password || !formData.name)) {
      toast.warning("Please fill in all required fields");
      return;
    }
  
    if (signupMethod === "mobile" && (!formData.mobile || !formData.name)) {
      toast.warning("Please fill in all required fields");
      return;
    } 
    // const formdata_name= formData.name
    //     const check_name = await userModel.findOne(formdata_name );
    //     if (check_name) {
    //         return toast.warning("Please provide unique name.");
    //     }
    setIsProcessing(true);
    try {
    if(signupMethod==="email"){

      try{

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/signup`, formData);
      console.log(response.data)
      if (response.data.status ==='success') {
        toast.success(response.data.message); // Show success toast
    } else {
        toast.error(response.data.message); // Handle unexpected cases (just in case)
    }
    console.log(response.data.message)
      // alert(response.data.message);
      setUserInfo(response.data.user);
      setOtpSent(true);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error signing up"; 
      toast.error(errorMessage);
    }
    finally {
      setIsProcessing(false);
  }

    } else {
try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/signin/add-mobile`, formData);
    
      console.log(response.data)
      if (response.data.status === 'SUCCESS') {
        toast.success(response.data.message); // Show success toast
    } else {
        toast.error(response.data.message); // Handle unexpected cases (just in case)
    }
      // alert(response.data.message);
      setUserInfo(response.data.user);
      setOtpSent(true);

    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error signing up"; 
      toast.error(errorMessage);
    }
    finally {
      setIsProcessing(false);
  }
};
} catch (error) {
  const errorMessage = error.response?.data?.message || "Error signing up"; 
  toast.error(errorMessage);
}
  }

  const verifyOtp = async () => {

    if (otp.length !== 4) {
      toast.warning("Please enter complete OTP");
      return;
    }

    if(signupMethod==="email"){     
    try {
      setIsProcessing(true);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/otp/verifyOTP`,
        {
          otp,
          userId: userInfo._id,
        });
        setIsProcessing(false);
        if (response.data.status ==='SUCCESS') {
          toast.success(response.data.message); // Show success toast
          toast.success('Email verify sucessfully now you can login.')
          navigate('/signin-password')
      } else {
          toast.error(response.data.message); // Handle unexpected cases (just in case)
      }
        console.log(response.data.message)
      // alert(response.data.message);
      // navigate("/signin-password");
      if (otpInputsRef.current) {
        otpInputsRef.current.forEach((input) => (input.value = ""));
      }
      setOtp('')
    } catch (error) {
      setIsProcessing(false);
      const errorMessage = error.response?.data?.message || "Error verifying OTP";
    toast.error(errorMessage);
      // toast.error("Error verifying OTP");
      // alert("Error verifying OTP");
    }
  } else {
    try {
      setIsProcessing(true);
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/signin/verify-mobile`,
        { otp, userId: userInfo._id },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 30000
        });
        setIsProcessing(false);
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          toast.success('Account Created Successfully')
          navigate("/dashboard");
        } else {
          toast.error(response.data.message);
        }

      //   if (response.data.status ==='SUCCESS') {
      //     navigate('/signin-password')
      //     toast.success(response.data.message); // Show success toast
      // } else {
      //   // console.log(response.data.message)
      //     toast.error(response.data.message); // Handle unexpected cases (just in case)
      // }



        // console.log(response.data.message)
      // alert(response.data.message);
      // navigate("/signin-password");
      if (otpInputsRef.current) {
        otpInputsRef.current.forEach((input) => (input.value = ""));
      }
      setOtp('')
    } catch (error) {
      setIsProcessing(false);
      const errorMessage = error.response?.data?.message || "Error verifying OTP";
    toast.error(errorMessage);
      // toast.error("Error verifying OTP");
      // alert("Error verifying OTP");
    }
  }
  };

  return (
    <div className="flex items-center justify-center font-[CustomFont] min-h-screen bg-gradient-to-br from-[#7ce9f8] via-[#1497A8] to-[#1e4e56] p-4">
    <div className="rounded-2xl shadow-xl p-8 w-full max-w-4xl flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-white">Verify Account</h2>
        <p className="text-gray-200 text-lg md:text-2xl mt-1">Please enter your account details</p>
  
    {/* Radio Buttons for Selecting Signup Method */}
  { !otpSent &&
  <div className="flex items-center gap-4 mt-4">
      <label className="flex items-center text-white cursor-pointer">
        <input
          type="radio"
          value="email"
          checked={signupMethod === "email"}
          onChange={() => setSignupMethod("email")}
          className="mr-2"
        />
        Sign up with Email
      </label>
      <label className="flex items-center text-white cursor-pointer">
        <input
          type="radio"
          value="mobile"
          checked={signupMethod === "mobile"}
          onChange={() => setSignupMethod("mobile")}
          className="mr-2"
        />
        Sign up with Mobile
      </label>
    </div>
}

        {!otpSent ? (
          <>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full p-3 mt-4 border bg-white border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-400"
            />
              {/* Conditionally render email or mobile input */}
        {signupMethod === "email" ? (
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="w-full p-3 mt-4 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-400"
          />
        ) : (
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            onChange={handleChange}
            className="w-full p-3 mt-4 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-400"
          />
        )}
              {/* Hide password field if signing up with mobile */}
        {signupMethod === "email" && (
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full p-3 mt-4 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-400"
          />
        )}
            <button
              onClick={handleSignup}
              // onClick={!isProcessing ? () => {handleSignup()} : undefined}
              disabled={isProcessing}
              className="mt-6 w-full cursor-pointer font-bold text-lg md:text-2xl text-white bg-gradient-to-br from-[#0a3b42] via-[#214e54] to-[#60c3d5] py-3 rounded-lg hover:opacity-90 transition-all"
            >
              {isProcessing ? "Processing..." : "SIGN UP"}
            </button>
            <p className="bg-white text-gray-600 h-12 md:h-14 text-lg md:text-xl rounded-xl flex justify-center pt-3 text-center mt-4">
              Already have an account?
              <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => navigate("/signin-password")}>
                &nbsp;&nbsp;SIGN IN
              </span>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-lg md:text-xl font-semibold text-gray-800 mt-4">Enter OTP</h2>
            <div className="flex gap-3 mt-2">
              {[1, 2, 3, 4].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  ref={(el) => (otpInputsRef.current[index] = el)}
                  className="w-10 md:w-12 h-10 md:h-12 text-lg md:text-2xl text-center bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-3 focus:ring-blue-400"
                  onChange={(e) => {
                    let newOtp = otp.split("");
                    newOtp[index] = e.target.value;
                    setOtp(newOtp.join(""));
                    if (e.target.value !== "" && index < 3) {
                      otpInputsRef.current[index + 1].focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && index > 0 && !otp[index]) {
                      otpInputsRef.current[index - 1].focus();
                    }
                  }}
                />
              ))}
            </div>
            <button
              onClick={verifyOtp}
              disabled={isProcessing}
              className="mt-6 w-full bg-gradient-to-r cursor-pointer from-gray-900 to-gray-700 text-white py-3 rounded-lg hover:opacity-90 transition-all"
            >
              {isProcessing ? "Processing..." : "Verify OTP"}
            </button>
          </>
        )}
      </div>
  
      {/* Right Section */}
      <div className="w-full md:w-1/2 h-60 md:h-130 bg-[rgba(13,84,88,0.5)] rounded-2xl flex flex-col items-center justify-center text-white px-6 md:px-8 mt-6 md:mt-0">
        <h2 className="text-2xl md:text-4xl text-center">Discover the Ancient Wisdom of the Vedas with AI</h2>
        <div className="mt-6 w-40 md:w-64 h-40 md:h-64 rounded-lg overflow-hidden">
          <img src={yoga} alt="Yoga Pose" className="w-full h-full object-cover [clip-path:polygon(50%_0%,_85%_20%,_100%_50%,_85%_80%,_50%_100%,_15%_80%,_0%_50%,_15%_20%)]" />
        </div>
      </div>
    </div>
  </div>
  
  );
}

export default Signup;
