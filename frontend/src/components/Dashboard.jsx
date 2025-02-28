import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("You have been logged out.");
    navigate("/signin-password");
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        // console.log("Dashboard token is", token);

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/dashboard`,
          {
            headers: { authorization: token },
          });

        
        console.log(response.status);

        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("You are not authorized to access this page.");
        navigate("/signin-password");
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-br from-[#01B7CF] via-[#1497A8] to-[#235961] p-6">
      <div className="max-w-lg w-full bg-white p-8 rounded-xl shadow-2xl transform transition-all hover:scale-105">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-6">
          🧘 Welcome to Your Yoga Dashboard
        </h1>

        <p className="text-gray-700 text-lg text-center leading-relaxed">
          Yoga connects the body, breath, and mind using postures, breathing
          exercises, and meditation for overall well-being.
        </p>

        <ul className="mt-6 text-gray-800 text-lg space-y-2">
          <li className="flex items-center">
            ✅ <span className="ml-2">Enhances flexibility & strength</span>
          </li>
          <li className="flex items-center">
            ✅ <span className="ml-2">Reduces stress & anxiety</span>
          </li>
          <li className="flex items-center">
            ✅ <span className="ml-2">Improves concentration & mental clarity</span>
          </li>
          <li className="flex items-center">
            ✅ <span className="ml-2">Promotes better sleep</span>
          </li>
        </ul>

        <button
          onClick={handleLogout}
          className="mt-6 w-full text-white text-lg font-semibold py-3 rounded-lg 
            bg-gradient-to-br from-[#0a3b42] via-[#214e54] to-[#60c3d5] 
            hover:opacity-90 transition-all duration-300 shadow-lg"
        >
          Logout 🚀
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
