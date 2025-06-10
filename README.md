# 💡 Answerly

Answerly is a collaborative MERN Stack platform that allows students and learners to **post doubts**, **answer questions**, and **gain points** by helping others. It’s designed to promote **peer-to-peer learning** with a gamified touch — streaks, points, and difficulty levels.

---

## 🚀 Features

- ✅ **Signup / Login** (JWT Auth)
- 📌 **Create Doubt Post** with subject, class, topic, and difficulty
- ✏️ **Edit Your Doubt Posts**
- ❌ **Delete Your Posts**
- 💬 **Answer Others’ Posts**
- 🔄 **Edit Your Answers**
- 🔥 **Maintain Streaks & Earn Points** by posting or answering daily
- 🧑‍💻 **Update Your Profile Info**

---

##📦 Folder Structure
answerly/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
└── README.md

## 🧠 How It Works

### 1. **Authentication**
Users sign up or log in with email & password. JWT tokens are stored in cookies and used to protect routes.

### 2. **Create Post**
Click **DoubtPosts > Create** to post your doubt with:
- Class
- Subject
- Topic
- Difficulty level

### 3. **Delete/Edit Post**
Your own posts can be edited or deleted anytime.

### 4. **Answer Doubts**
Other users can answer your questions.
- Each answer earns **points**.
- Editing answers is allowed.

### 5. **Streaks**
Daily activity (posting or answering) builds your streak.
- Missing a day resets it.

### 6. **Profile**
Edit your profile: username, bio, and avatar.

---

## 🛠 Tech Stack

### 👨‍💻 Frontend
- React.js
- Tailwind CSS
- Axios
- React Router

### 🧩 Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (Authentication)
- bcrypt (Password hashing)

---

## 🧪 Installation & Running the Project

> Make sure you have **Node.js**, **MongoDB**, and **Git** installed.

### 🔻 1. Clone the repository

```bash
git clone https://github.com/your-username/answerly.git
cd answerly
