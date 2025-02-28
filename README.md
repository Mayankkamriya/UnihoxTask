
# 🔐 Authentication API (DDD & SOLID Architecture)

## 📌 Overview
This project is a secure authentication system built using **Node.js, Express, MongoDB, and JWT**, following **Domain-Driven Design (DDD)** and adhering to **SOLID principles**. It provides multiple authentication methods, including **password-based login** and **OTP-based login**, with email verification via Nodemailer.

---

## ✨ Features
- 📝 **User Registration** with email and password
- 📧 **Email Verification** through OTP
- 🔑 **Secure Authentication** with JWT
- 🔐 **Password-based Login**
- 🔢 **OTP-based Login**
- 🔓 **Token-based Authorization**
- 🔁 **Resend OTP functionality**
- 🛡️ **Middleware for Protected Routes**

---

## 🛠 Technology Stack
- 🚀 **Backend:** Node.js, Express.js
- 🗄️ **Database:** MongoDB (Mongoose ODM)
- 🔑 **Authentication:** JWT, bcrypt for password hashing
- 📧 **Email Service:** Nodemailer with SMTP
- 🛡️ **Validation:** Zod
- 🔒 **Security:** CORS, dotenv for environment configuration

---

## 📂 Folder Structure (DDD)
```
/backend
 ├── /src
 │   ├── /domain
 │   │   ├── services
 │   │   │   ├── AuthService.js
 │   ├── /infrastructure
 │   │   ├── models
 │   │   │   ├── otp.js
 │   │   │   ├── user.js
 │   │   ├── email
 │   │       ├── EmailService.js
 │   │   ├── db.js
 │   ├── /presentation
 │   │   ├── middleware
 │   │       ├── auth.js
 │   │   ├── routes
 │   │       ├── otp.js
 │   │       ├── signin.js
 │   │       ├── signup.js
 │   ├── index.js
/frontend
 ├── /src
 │   ├── /components
 │   │   ├── Dashboard.jsx
 │   │   ├── MainPage.jsx
 │   │   ├── SignInOtp.jsx
 │   │   ├── SignInPassword.jsx
 │   │   ├── SignUp.jsx
 │   ├── App.jsx
```

---

## ⚙️ Setup Instructions
### 📥 Clone the Repository:
```sh
git clone https://github.com/Mayankkamriya/UnihoxTask.git
```

### 📌 Install Backend Dependencies & Start Server:
```sh
cd backend
npm install
cd src
node index.js
```

### 📌 Install Frontend Dependencies & Start App:
```sh
cd frontend
npm install
npm run dev
```

### 🔑 Environment Variables
Create a `.env` file in the **backend** folder:
```sh
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
EMAIL=your-email
PASS=your-email-password
HOST=smtp.example.com
```
Create a `.env` file in the **frontend** folder:
```sh
VITE_API_URL=http://localhost:3000
VITE_JWT_SECRET=your-secret-key
```

### 🌍 Open the App at:
```
http://localhost:3000
```

---

## 🔗 API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| **POST** | `/api/v1/signup` | Register a new user |
| **POST** | `/api/v1/signin/password` | Login with email and password |
| **POST** | `/api/v1/signin/request-otp` | Request OTP for login |
| **POST** | `/api/v1/signin/otp` | Verify OTP and login |
| **POST** | `/api/v1/resendOTP` | Resend OTP |
| **GET** | `/api/v1/dashboard` | Protected route (requires authentication) |

---

## 🌍 Deployment
🔗 **Live Demo:** [https://unihox-task.vercel.app](https://unihox-task.vercel.app)

---

## 👨‍💻 Developer Details:
**Mayank Kamriya**  
B.B.A. - Vikram University  
🌐 [LinkedIn](https://www.linkedin.com/in/mayank-kamriya)
📧 [mayankkamriya305@gmail.com](mailto:mayankkamriya305@gmail.com)  
📞 +91 8253038815  

 *Made with ❤️ by Mayank Kamriya*