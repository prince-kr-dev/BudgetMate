# 💰 Budget Tracker Backend

This is a **Node.js + Express + MongoDB** backend for a **personal budget tracker**.
It supports user authentication, CRUD operations for transactions, and user profile management.

---

## 📂 Features

### Authentication

* **Signup** with username, email, and strong password
* **Login** with JWT authentication stored in cookies
* **Logout** clears the token

### Transactions

* Add new **transactions** (income or expense)
* View **all transactions for the logged-in user**
* Edit or delete **only the logged-in user’s transactions**
* Dashboard fetch for user's transactions

### User Profile

* View user profile (`fullName`, `userName`, `email`, `photoURL`)
* Update allowed fields (`fullName`, `userName`, `photoURL`)

### Security

* JWT-based authentication with `authMiddleware`
* Ownership checks: Users can only edit/delete their own transactions
* Input validation on models and routes
* Passwords are hashed using bcrypt

---

## 🛠 Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB** via **Mongoose**
* **JWT** for authentication
* **bcrypt** for password hashing
* **cookie-parser** for token storage
* **dotenv** for environment variables
* **validator** for email and password validation

---

## ⚙️ Setup & Installation

1. **Clone the repository**

```bash
git clone <repository-url>
```

2. **Install dependencies**

```bash
npm install
```

3. **Create a `.env` file** in the root:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=1d
```

4. **Start the server**

```bash
npm run dev  # using nodemon
# or
npm start    # using node
```

The backend will run on `http://localhost:5000` (or the port you set).

---

## 🔗 API Endpoints

### **Auth Routes** (`/auth`)

| Method | Route     | Description                     |
| ------ | --------- | ------------------------------- |
| POST   | `/signup` | Register a new user             |
| POST   | `/login`  | Login user and issue JWT cookie |
| POST   | `/logout` | Logout and clear JWT cookie     |

---

### **Transaction Routes** (`/transactions`)

| Method | Route         | Description                                    |
| ------ | ------------- | ---------------------------------------------- |
| POST   | `/`           | Add a new transaction (income/expense)         |
| GET    | `/dashboard`  | Fetch all transactions for logged-in user      |
| PUT    | `/edit/:id`   | Edit a transaction (owned by logged-in user)   |
| DELETE | `/delete/:id` | Delete a transaction (owned by logged-in user) |

---

### **Profile Routes** (`/profile`)

| Method | Route   | Description                                            |
| ------ | ------- | ------------------------------------------------------ |
| GET    | `/view` | Get user profile                                       |
| PUT    | `/edit` | Edit user profile (`fullName`, `userName`, `photoURL`) |

---

## 🔐 Authentication

* JWT token is stored in **HTTP-only cookies**
* Protected routes require `authMiddleware`
* Only the logged-in user can edit/delete their transactions

---

## 📦 Models

### User

* `fullName`: String
* `userName`: String (unique)
* `email`: String (unique, validated)
* `password`: String (hashed, strong password required)
* `photoURL`: String (default icon)

### Transaction

* `user`: ObjectId reference to User
* `transactionType`: "income" or "expense"
* `amount`: Number (min 0)
* `paymentMethod`: Enum (`Cash`, `Credit Card`, `Debit Card`, `Bank Transfer`, `UPI`, `Other`)
* `description`: String (optional, default text)

---

## ✅ Best Practices Implemented

* JWT auth with cookies
* Ownership checks for transaction edits/deletes
* Input validation for users and transactions
* Error handling with proper status codes


## Author

* Prince Kumar