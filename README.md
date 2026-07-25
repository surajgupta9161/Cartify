# 🛒 Cartify

Cartify is a full-stack MERN E-Commerce web application that allows users to browse products, create accounts, manage carts, and place orders with a smooth and responsive user experience.

## 🚀 Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- CSS / Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- dotenv

## 📂 Project Structure

```
Cartify/
│
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── app.js
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── Frontend/
│
└── README.md
```

## ✨ Features

- User Authentication (Register & Login)
- Secure JWT Authentication
- Password Encryption using bcrypt
- REST API Architecture
- MongoDB Database Integration
- Responsive User Interface
- Cart Management
- Product Management
- Order Management
- Protected Routes

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/surajgupta9161/Cartify.git
```

### Backend Setup

```bash
cd Backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

## 🔑 Environment Variables

Create a `.env` file inside the **Backend** folder.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## 📌 Future Features

- Wishlist
- Payment Gateway Integration
- Product Search & Filters
- Admin Dashboard
- Order Tracking
- Product Reviews & Ratings

## 👨‍💻 Author

**Suraj Gupta**

- GitHub: https://github.com/surajgupta9161
- LinkedIn: https://www.linkedin.com/in/suraj-gupta-860a24316/

---

⭐ If you like this project, don't forget to star the repository.
