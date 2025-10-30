# BudgetMate – MERN Personal Finance Tracker

BudgetMate is a full-stack MERN application that helps users track expenses, manage budgets, and view spending insights with a clean, responsive interface and secure authentication.

---

## Features

### Authentication

* User Signup / Login / Logout using JWT
* Tokens stored securely in HTTP-only cookies
* Protected routes for authenticated users

### Transactions

* Add, edit, or delete transactions (income or expense)
* View all transactions for the logged-in user
* Dashboard insights for income vs. expenses

### User Profile

* View and edit profile details (`fullName`, `userName`, `photoURL`)
* Secure access — only owner can edit their profile

### Extras

* Dashboard analytics and summary cards
* Responsive and modern Tailwind CSS UI
* Reusable, component-based React architecture

---

## Tech Stack

### Frontend

* React.js (Vite)
* React Router DOM
* Tailwind CSS
* Axios (API calls)
* Context API (Auth & global state)

### Backend

* Node.js + Express.js
* MongoDB (via Mongoose)
* JWT Authentication
* bcrypt for password hashing
* cookie-parser for secure cookies
* dotenv for environment configuration
* validator for input validation

---

## Folder Structure

```
budgetmate/
│
├── frontend/
│   ├── public/               # Static assets
│   └── src/
│       ├── components/       # Navbar, Forms, etc.
│       ├── context/          # AuthContext
│       ├── pages/            # Login, Signup, Dashboard
│       ├── App.jsx
│       └── main.jsx
│
└── backend/
    ├── models/               # User & Transaction schemas
    ├── routes/               # Auth, Transaction, Profile APIs
    ├── middleware/           # authMiddleware.js
    ├── controllers/          # Route logic
    ├── config/               # DB connection
    ├── server.js
    └── .env.example
```

---

## Setup & Installation

1. Clone the repository

   ```bash
   git clone https://github.com/prince-kr-dev/BudgetMate.git
   ```

2. Install dependencies

   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   ```

3. Create `.env` in backend

   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   JWT_EXPIRES_IN=1d
   ```

4. Run the app

   ```bash
   # In backend folder
   npm run dev

   # In frontend folder
   npm run dev
   ```

Frontend: `http://localhost:5173`
Backend: `http://localhost:5000`

---

## API Endpoints

### Auth Routes (`/auth`)

| Method | Route     | Description                     |
| ------ | --------- | ------------------------------- |
| POST   | `/signup` | Register a new user             |
| POST   | `/login`  | Login user and issue JWT cookie |
| POST   | `/logout` | Logout and clear JWT cookie     |

### Transaction Routes (`/transactions`)

| Method | Route         | Description                                    |
| ------ | ------------- | ---------------------------------------------- |
| POST   | `/`           | Add a new transaction                          |
| GET    | `/dashboard`  | Fetch user’s transactions                      |
| PUT    | `/edit/:id`   | Edit a transaction (owned by logged-in user)   |
| DELETE | `/delete/:id` | Delete a transaction (owned by logged-in user) |

### Profile Routes (`/profile`)

| Method | Route   | Description                                            |
| ------ | ------- | ------------------------------------------------------ |
| GET    | `/view` | Get user profile                                       |
| PUT    | `/edit` | Edit user profile (`fullName`, `userName`, `photoURL`) |

---

## Authentication Flow

* User logs in → JWT token issued and stored in HTTP-only cookie
* Protected routes use authMiddleware for token validation
* Only the logged-in user can access or modify their own data

---

## Models

### User

```js
{
  fullName: String,
  userName: String,
  email: String,
  password: String,
  photoURL: String
}
```

### Transaction

```js
{
  user: ObjectId (ref: 'User'),
  transactionType: "income" | "expense",
  amount: Number,
  paymentMethod: "Cash" | "Card" | "UPI" | "Other",
  description: String
}
```

---

## Author

Prince Kumar
