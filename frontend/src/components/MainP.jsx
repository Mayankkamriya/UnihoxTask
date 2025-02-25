import React from "react";
import { useNavigate } from "react-router-dom";
import yoga from "../assets/image.png"
const HomePage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/signin-password");
  };

  return (
    <div className="flex items-center justify-center font-[CustomFont] min-h-screen bg-gradient-to-br from-[#7ce9f8] via-[#1497A8] to-[#1e4e56] p-4">
    <div className="rounded-2xl shadow-xl p-8 w-full max-w-4xl flex flex-col md:flex-row">
     
      {/* Left Section */}
      {/* <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-white text-center">Welcome to Yoga App</h2>
        <p className="text-gray-200 text-lg md:text-2xl mt-1 text-center">Please log in to access your dashboard.</p>
        <button
          onClick={handleLoginClick}
          className="mt-6 w-full font-bold text-lg md:text-2xl text-white bg-gradient-to-r from-[#0a3b42] via-[#214e54] to-[#60c3d5] py-3 rounded-lg hover:opacity-90 transition-all"
        >
          Login
        </button>
      </div> */}

{/* <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#5cc6d0] via-[#10707c] to-[#04292e] p-4"> */}
  <div className=" flex flex-col items-center justify-center bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
    <h2 className="text-2.5xl md:text-4xl font-semibold text-gray-800 text-center">
      Welcome to Yoga App
    </h2>
    <p className="text-gray-600 text-lg md:text-2xl mt-2 text-center">
      Please log in to access your dashboard.
    </p>
    <button
      onClick={handleLoginClick}
      className="mt-5 w-full font-bold text-lg md:text-2xl text-white bg-gradient-to-r from-[#0a3b42] via-[#214e54] to-[#60c3d5] py-3 rounded-lg hover:opacity-90 transition-all"
    >
      Login
    </button>
  </div>
{/* </div> */}

      {/* Right Section */}
      <div className="w-full md:w-1/2 h-60 md:h-130 bg-[rgba(13,84,88,0.5)] rounded-2xl flex flex-col items-center justify-center text-white px-6 md:px-8 mt-6 md:mt-0">
        <h2 className="text-2xl md:text-4xl text-center">Discover the Ancient Wisdom of the Vedas with AI</h2>
        <div className="mt-6 w-40 md:w-64 h-40 md:h-64 rounded-lg overflow-hidden">
          <img src={yoga} alt="Yoga Pose" className="w-full h-full object-cover [clip-path:polygon(50%_0%,_85%_20%,_100%_50%,_85%_80%,_50%_100%,_15%_80%,_0%_50%,_15%_20%)]" />
        </div>
      </div>
    </div>
  </div>
  
    // <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#7ce9f8] via-[#1497A8] to-[#1e4e56]">
    //   <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
    //     <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
    //       Welcome to Yoga App
    //     </h1>
    //     <p className="text-gray-600 text-center mb-6">
    //       Please log in to access your dashboard.
    //     </p>
    //     <button
    //       onClick={handleLoginClick}
    //       className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
    //     >
    //       Login
    //     </button>
    //   </div>
    // </div>
  );
};

export default HomePage;
