
# 🔐 Authentication API

##  📌  **Overview**
This project is a secure authentication system built using **Node.js, Express, MongoDB, and JWT**. It provides multiple authentication methods, including **password-based login and OTP-based login**, with **email verification** via **nodemailer**.

## ✨ **Features**
- 📝 **User Registration** with email and password  
- 📧 **Email Verification** through OTP  
- 🔑 **Secure Authentication** with JWT  
- 🔐 **Password-based Login**  
- 🔢 **OTP-based Login**  
- 🔓 **Token-based Authorization**  
- 🔁 **Resend OTP functionality**  
- 🛡️ **Middleware for Protected Routes**  

## 🛠 **Technology Stack**
- 🚀 **Backend:** Node.js, Express.js  
- 🗄️ **Database:** MongoDB (Mongoose ODM)  
- 🔑 **Authentication:** JWT, bcrypt for password hashing  
- 📧 **Email Service:** Nodemailer with SMTP  
- 🛡️ **Validation:** Zod  
- 🔒 **Security:** CORS, dotenv for environment configuration  

## ⚙️ **Setup Instructions**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/authentication-api.git
   ```

2. Install backend dependencies and start the server:
   ```bash
   cd backend
   npm install
   node index.js
   ```

3. Install frontend dependencies and start the app:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. Create a .env file in the backend folder
   ```bash
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-secret-key
   EMAIL=your-email
   PASS=your-email-password
   HOST=smtp.example.com
   ```

5.  Create a .env file in the backend folder
   ```bash
   VITE_API_URL=http://localhost:3000
   VITE_JWT_SECRET=your-secret-key
   ```

6. Open the app at: [http://localhost:3000](http://localhost:3000)


## 🔗  API Endpoints

   - POST `/api/v1/signup` → Register a new user
   - POST `/api/v1/signin/password` → Login with email and password
   - POST `/api/v1/signin/request-otp` → Request OTP for login
   - POST `/api/v1/signin/otp` → Verify OTP and login
   - POST `/resendOTP` → Resend OTP
   - GET `/api/v1/dashboard` → Protected route (requires authentication)

## 🌍 Deployment
   The project is deployed online. You can access it here:  
   🔗 **Live Demo:** [https://unihox-task.vercel.app](https://unihox-task.vercel.app)

---

## 👨‍💻 **Developer Details:**

   **Mayank Kamriya**  
      B.B.A. - Vikram University  
      🌐 [LinkedIn](https://www.linkedin.com/in/mayank-kamriya) | 📧 mayankkamriya305@gmail.com
      📞 +91 8253038815

---

> Made with ❤️ by Mayank Kamriya