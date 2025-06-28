
# 🧵 StitchMeUp - Full Stack Clothing E-Commerce Platform

**StitchMeUp** is a modern full-stack e-commerce platform built with the **MERN stack** (MongoDB, Express, React, Node.js). It provides a seamless online clothing shopping experience with secure authentication, cart and checkout functionality, product and order management for admins, and Razorpay integration for payments.

---

## 🚀 Features

### 👤 User Features
- User Registration and Login (JWT-based authentication)
- Browse trending products and categories
- Product details with size, price, and description
- Add to cart and manage cart items
- Checkout with payment gateway (Razorpay)
- View order history
- Responsive design for mobile/tablet/desktop

### 🔐 Admin Features
- Secure admin login
- Admin dashboard to manage:
  - 🛍️ Products (Add/Edit/Delete)
  - 📦 Orders (Update status)
  - 👥 Users (View/Delete)
- Product image upload with Multer
- Real-time order updates

---

## 🧾 Tech Stack

### Frontend:
- React.js
- Redux Toolkit (for state management)
- React Router DOM
- Axios (for API calls)
- Tailwind CSS (UI styling)
- Toastify (Notifications)

### Backend:
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Multer (for image upload)
- Razorpay (payment gateway)

---

## 📁 Folder Structure

```bash
StitchMeUp/
│
├── backend/                    # Backend API & DB Logic
│   ├── controllers/            # Route controller logic
│   ├── models/                 # Mongoose schemas
│   ├── routes/                 # Express API routes
│   ├── middleware/             # JWT auth, error handling
│   ├── uploads/                # Uploaded images
│   ├── config/                 # DB and Razorpay config
│   ├── server.js               # Entry point of backend
│   └── .env                    # Environment variables
│
├── frontend/                   # React Frontend
│   ├── public/                 # Static files
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Page components (Home, Cart, etc.)
│   │   ├── redux/              # Redux Toolkit slices
│   │   ├── App.js              # Root component
│   │   └── index.js            # Entry point
│   └── tailwind.config.js
│
├── .gitignore
├── package.json
└── README.md
````

---

## ⚙️ Getting Started (Development Setup)

### 1. Clone the Repository

```bash
git clone https://github.com/aadityaexe/StitchMeUp.git
cd StitchMeUp
```

### 2. Backend Setup

```bash
cd backend
npm install
```

**Create a `.env` file:**

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
```

**Start Backend Server**

```bash
npm run server
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

### Access the App

Open your browser at: [http://localhost:3000](http://localhost:3000)

---

## 📡 API Endpoints (Backend)

| Method | Endpoint              | Description                 |
| ------ | --------------------- | --------------------------- |
| POST   | `/api/users/register` | Register a new user         |
| POST   | `/api/users/login`    | Login and get token         |
| GET    | `/api/products`       | Get all products            |
| POST   | `/api/products`       | Add new product (Admin)     |
| PUT    | `/api/products/:id`   | Update product (Admin)      |
| DELETE | `/api/products/:id`   | Delete product (Admin)      |
| POST   | `/api/orders`         | Place order (User)          |
| GET    | `/api/orders/user`    | Get user’s orders           |
| PUT    | `/api/orders/:id`     | Update order status (Admin) |

---

## 📸 Screenshots

> Add screenshots in `/screenshots` folder and update the paths below

| 🏠 Homepage                     | 🛍️ Product View               | 🛒 Cart Page                | ⚙️ Admin Dashboard           |
| ------------------------------- | ------------------------------ | --------------------------- | ---------------------------- |
| ![](./screenshots/homepage.png) | ![](./screenshots/product.png) | ![](./screenshots/cart.png) | ![](./screenshots/admin.png) |

---

## 🌱 Future Improvements

* 🔍 Product filters (size, brand, price)
* ⭐ Product ratings and reviews
* 🧾 Invoice PDF download
* 💬 Chatbot for support
* 📦 Shipment tracking integration
* ✉️ Email notifications

---

## 🙋‍♂️ Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 📬 Contact

**Author:** [Aditya Kumar](https://github.com/aadityaexe)
📧 Email: [adityakumar.dev@example.com](mailto:adityakumar.dev@example.com)
📱 LinkedIn: [linkedin.com/in/aditya-kumar-dev](https://linkedin.com/in/aditya-kumar-dev)
🌐 Portfolio: [your-portfolio-link.com](https://your-portfolio-link.com)

---

**If you liked the project, don't forget to ⭐ the repo!**

```

---

### ✅ What you should add:
- Replace dummy values like your Razorpay key, Mongo URI, and portfolio links with your actual ones (or `.env.example`).
- Add screenshot images to a `/screenshots` folder and update the image paths accordingly.
- If this is deployed (on Render, Vercel, or Netlify), update the **Live Demo** link.

Would you like me to generate the `.env.example` or a LICENSE file too?
```
