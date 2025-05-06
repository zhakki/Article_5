# ArticlesApp – Fullstack Blog Platform

This project is a fullstack web application that allows users to create, manage, and comment on articles. It includes both backend and frontend components.

## 🔧 Technologies Used

- **Frontend**: React, React Router, React Bootstrap
- **Backend**: Node.js, Express.js, Sequelize, PostgreSQL
- **Authentication**: JWT-based authentication
- **Styling**: Bootstrap

---

## 📁 Project Structure

### Backend (`/BACKENDARTICLES 2`)
- `config/` – Database configuration and validation helpers
- `controllers/` – Route logic for articles, users, and comments
- `middleware/` – JWT auth, validation middleware
- `models/` – Sequelize models
- `routes/` – API endpoints
- `seeders/` – Initial data for roles and users
- `uploads/` – For uploaded article images
- `.env` – Environment variables
- `index.js` – App entry point

### Frontend (`/REACT-ARTICLES-APP`)
- `src/pages/` – All views: Articles, Login, Register, Profile, etc.
- `src/components/` – Layouts and shared components
- `assets/` – (Optional) Static files like logos or placeholders

---

## ✅ Features

### Authentication
- Register with email, username, password
- Login with JWT token saved in `localStorage`

### Articles
- View all articles
- View article details (with image and comments)
- Create, update, and delete your own articles
- Admin can delete any article

### Comments
- View comments for each article
- Add comment when authenticated
- Edit and delete own comments only

---

## 🚀 Running the App Locally

### 1. Clone the Repository

```bash
git clone https://github.com/zhakki/Fronted-5.git
cd articlesapp
```

### 2. Install Backend

```bash
cd BACKENDARTICLES\ 2
npm install
```

### 3. Setup PostgreSQL Database

Create a database named `articles` and configure credentials in `.env`:

```
PORT=3000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=articles
JWT_SECRET=supersecret
```

Then run migrations/seeders:

```bash
node config/createDatabase.js
```

### 4. Run Backend

```bash
node index.js
```

### 5. Install Frontend

```bash
cd ../REACT-ARTICLES-APP
npm install
```

### 6. Run Frontend

```bash
npm run dev
```

---

## 🧪 Test Accounts

| Role  | Email              | Password |
|-------|--------------------|----------|
| Admin | admin@example.com  | admin123 |
| User  | test@example.com   | test123  |

---

## 📌 Notes

- Article images saved in `/uploads`
- Comments require login
- Only authors or admins can modify or delete

---

## 📃 License

MIT
