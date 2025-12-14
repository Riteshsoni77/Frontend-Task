# Frontend Task

A full-stack task management app with authentication, built using **React.js** (frontend), **Node.js/Express** (backend), and **MySQL** (database).  
Features JWT authentication, CRUD operations for tasks, and a responsive Material UI design.

---

## 🚀 Features

- User registration, login, and logout (JWT-based)
- Protected dashboard (login required)
- View and update user profile
- Create, read, update, and delete tasks
- Responsive UI with Material UI
- Client-side and server-side form validation
- Secure password hashing and token validation

---

## 🖥️ Tech Stack

- **Frontend:** React.js, Material UI
- **Backend:** Node.js, Express.js, Sequelize ORM
- **Database:** MySQL
- **Authentication:** JWT

---

## 📦 Project Structure

```
frontend-task/
│
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── Frontend Task API..postman_collection.json
├── API.md
└── README.md
```

---

## 🛠️ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/frontend-task.git
cd frontend-task
```

### 2. Setup the Backend

```bash
cd backend
npm install
# Create a .env file (see .env.example)
npm start
```

### 3. Setup the Frontend

```bash
cd ../frontend
npm install
npm start
```

### 4. MySQL Database

- Create a MySQL database and update your backend `.env` file with credentials.
- Sequelize will auto-create tables on first run.

---

## 🔐 API Documentation

- See [`API.md`](./API.md) for all endpoints, request/response formats, and authentication details.
- Or import [`Frontend Task API..postman_collection.json`](./Frontend%20Task%20API..postman_collection.json) into Postman.




**Made with ❤️ by [Ritesh soni]**
