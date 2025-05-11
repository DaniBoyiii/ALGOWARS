# ⚔️ AlgoWars

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)
![Express](https://img.shields.io/badge/API-Express.js-lightgrey?logo=express)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen?logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)
![Issues](https://img.shields.io/github/issues/yourusername/algowars)
![Stars](https://img.shields.io/github/stars/yourusername/algowars?style=social)

---

## 📚 Overview

**AlgoWars** is an online coding practice platform inspired by sites like LeetCode and HackerRank. Users can solve algorithmic challenges, test code against custom and hidden test cases, and improve their problem-solving skills in a battle-like interface.

---

## 🚀 Features

- 🧠 Solve algorithmic coding challenges  
- 👥 User authentication (login/register)  
- 💾 Code execution with real-time feedback  
- 📈 Track progress and completed problems  
- 🌐 RESTful API using Express.js  
- 🔐 Secure MongoDB database for storing users and problem data  

---

## 🏗️ Tech Stack

| Layer       | Technology        |
|-------------|-------------------|
| Frontend    | React, CSS/SCSS   |
| Backend     | Node.js, Express  |
| Database    | MongoDB           |
| Auth        | JWT, Bcrypt       |


---

## 📁 Project Structure

```
algowars/
├───backend/
│   └───semicolon-main/
│       ├───controllers/       # Route handlers
│       ├───middleware/        # Authentication and other middleware
│       ├───models/            # Mongoose schemas
│       ├───res/
│       │   └───images/        # Static image assets
│       ├───routes/            # API route definitions
│       └───utils/             # Utility functions
├───frontend/
│   ├───build/                 # Production build output
│   ├───public/                # Public static files
│   └───src/
│       ├───components/
│       │   ├───codewindow/    # Code editor window
│       │   ├───footer/        # Footer component
│       │   ├───header/        # Header/navbar component
│       │   ├───langdrop/      # Language selector dropdown
│       │   └───themedrop/     # Theme selector dropdown
│       ├───constants/         # Constant values
│       ├───images/            # Frontend image assets
│       ├───lib/               # Libraries (e.g., code execution, API hooks)
│       ├───pages/
│       │   ├───addProblem/    # Add new problem interface
│       │   ├───editor/        # Code editor page
│       │   ├───home/          # Landing page
│       │   ├───leaderboard/   # Leaderboard UI
│       │   ├───login/         # Login page
│       │   ├───problems/      # Problems list page
│       │   ├───profile/       # User profile page
│       │   └───registration/  # Registration form
│       ├───routes/            # React Router routes
│       └───utils/             # Helper functions
```

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/algowars.git
cd algowars
```

### 2. Install dependencies

#### Server

```bash
cd backend/semicolon-main
npm install or npm i
```

#### Client

```bash
cd ../../frontend
npm install or npm i
```

### 3. Set up environment variables

Create a `.env` file in the `backend/semicolon-main/` directory with the following:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

### 4. Run the app

#### Server

```bash
cd backend/semicolon-main
npm run dev
```

#### Client

```bash
cd frontend
npm start
```

---

## 🔐 Authentication

- Uses JWT for secure login/session handling.  
- Passwords are hashed using Bcrypt before storing.

---

## 📬 API Overview

Basic endpoints include:

- `POST /api/auth/register` – User registration  
- `POST /api/auth/login` – User login  
- `GET /api/problems` – Fetch all coding problems  
- `POST /api/submit` – Submit code and receive verdict  

(For a full list, see API docs in `/backend/semicolon-main/docs` if available.)

---

## 🎯 Future Improvements

- Code editor with syntax highlighting (Monaco)  
- Real-time leaderboard  
- Contest mode and timed battles  
- Multiple language support (Python, Java, etc.)  
- Admin panel for adding problems  

---

## 🙌 Contributing

Contributions are welcome! Please fork the repository and submit a pull request. For major changes, open an issue first.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Maintainer

**Your Name** – [@Dani_Boyiii](https://github.com/DaniBoyiii)
