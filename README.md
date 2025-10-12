# 🛍️ Full-Stack E-Commerce App with Microservices Architecture | Monorepo 🚀

A **full-stack e-commerce application** with an admin dashboard, built using a **microservices architecture** in a monorepo setup powered by **Turborepo**.

This project demonstrates how to structure and develop multiple microservices for an e-commerce platform using **Next.js**, **Express.js**, **Fastify.js**, **Hono.js**, **Prisma**, **MongoDB**, **Kafka**, and **Stripe** for payments. The repository includes a shared database package, shared types, and role-based authentication middleware.

---

## ⚡Back-end Features

- Monorepo architecture using **Turborepo**
- Microservices for:
  - Products
  - Orders
  - Payments
  - Authentication
  - Email
- **Role-based authentication** across services
- **Stripe Checkout** integration with backend and webhooks
- **Kafka** event-driven architecture for asynchronous communication
- Database management with **Prisma** (PostgreSQL/MySQL) and **MongoDB**
- **Next.js** frontend with search filters and product pages
- Admin Dashboard:
  - Manage Products, Orders, Users, Categories
  - Fetch charts, card lists, and analytics
  - Create, update, and delete operations
- Microservice authentication middleware for **Express**, **Fastify**, and **Hono**
- Email notifications using **Nodemailer** and Kafka events

---

## 💻 Client-Side Features

- Next.js Frontend for e-commerce store
- Product listing, filtering, and search functionality
- Product detail pages with multiple images, sizes, and colors
- Shopping cart with quantity management and remove item option
- Checkout flow with:
  - Shipping address form
  - Payment method integration (Stripe)
- Order summary and confirmation page
- User authentication with JWT (login/signup)
- Role-based access for admin and regular users
- Responsive design for mobile and desktop
- React Query for efficient data fetching and mutations
- Real-time updates for cart and order status

---

## 🧑‍💼 Admin Dashboard Features

- User Management
  - Create, update, and delete users
  - Role-based access control (admin vs regular users)
  - View individual user details and orders
- Product Management
  - Create, update, and delete products
  - Add product categories
  - Manage product images, sizes, and colors
- Order Management
  - View all orders
  - Update order status (pending, shipped, delivered, canceled)
  - Filter and search orders
- Analytics & Reports
  - Fetch and display charts (sales, orders, users)
  - View total revenue, discounts, and shipping fees
  - Dashboard summary for quick insights
- Email & Notifications
  - Send order confirmation emails
  - Integrates with Kafka events for real-time notifications
- React Query Integration
  - Efficient data fetching, caching, and mutations
  - Real-time updates in dashboard UI

---

## 🛠️ Services Overview

### Product Service
- Manages product CRUD
- Integrated with **Prisma** **PostgreSQL**
### Order Service
- Handles orders and status
- Communicates via Kafka
- Integrated with **MongoDB**
### Payment Service
- Stripe integration
- Payment webhooks
### Auth Service
- JWT-based authentication
- Role-based access control
### Email Service
- Sends order confirmation and notifications
- Integrated with Kafka events

---

## 🗄️Database Setup
- Prisma: prisma migrate dev for SQL services
- MongoDB: Use .env for URI connection
- The shared database package is used in Turborepo to maintain schema consistency

---

## 💳 Stripe Integration
- Stripe Checkout for payments
- Stripe webhook handler for payment confirmation
- Products created dynamically using Kafka events

---

## 📝 Monorepo Structure

### 📦 apps
- ┣ 📂 admin__**Admin dashboard application**
- ┣ 📂 auth-service__**Authentication microservice**
- ┣ 📂 client__**Next.js e-commerce frontend**
- ┣ 📂 product-service__**Product microservice**
- ┣ 📂 order-service__**Order microservice**
- ┣ 📂 payment-service__**Payment microservice**
- ┗ 📂 email-service__**Email service microservice**

### 📦 packages
- ┣ 📂 eslint-config__**Shared ESLint configuration**
- ┣ 📂 kafka__**Shared Kafka setup for all services**
- ┣ 📂 order-db__**Shared order database package**
- ┣ 📂 product-db__**Shared product database package**
- ┣ 📂 types__**Shared TypeScript types**
- ┗ 📂 typescript-config__**Shared TypeScript configuration**
