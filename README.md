<div align="center">

# 🍕 FOOH

### Food Delivery & Takeaway Platform

A full-stack food delivery web application built with **Next.js 16**, **Express.js**, **MongoDB**, and **Gemini AI**.

![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss)
![MongoDB](https://img.shields.io/badge/MongoDB-7.5-47A248?style=for-the-badge&logo=mongodb)
![Express.js](https://img.shields.io/badge/Express.js-5-000000?style=for-the-badge&logo=express)

[![Deployed on Vercel](https://img.shields.io/badge/Client-Vercel-000000?style=for-the-badge&logo=vercel)](https://fooh-client.vercel.app)
[![Deployed on Render](https://img.shields.io/badge/Server-Render-46E3B7?style=for-the-badge&logo=render)](https://fooh-server.onrender.com)

</div>

---

## ✨ Features

### 👤 Customer Features
- 🔐 **Authentication** — Email/password & Google OAuth login
- 🍽️ **Browse Menu** — Explore food items with filters, search & sorting
- 📂 **Categories** — Browse by food category
- 🛒 **Cart** — Add items, adjust quantities, checkout
- 📦 **Order Tracking** — View order status (Pending / Accepted / Rejected)
- 💬 **AI Chat Assistant** — Ask about menu, get recommendations (powered by Groq + Llama 3.1)
- 📱 **Fully Responsive** — Works on mobile, tablet, and desktop

### 🔧 Admin Features
- 📊 **Dashboard** — Sales charts, revenue stats, recent orders (Recharts)
- ➕ **Add Items** — Create new menu items with images, prices, tags
- 📝 **Manage Items** — View, search, edit, delete menu items
- 📂 **Add Categories** — Create new food categories
- 📋 **Manage Categories** — View, edit, delete categories
- ✅ **Order Management** — Accept or reject incoming orders

### 🌐 Static Pages
- About Us, Careers, Press, Help Center, Safety, Terms of Service, Privacy Policy

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16, React 19, TypeScript, Tailwind CSS v4 |
| **Backend** | Express.js 5, Node.js |
| **Database** | MongoDB (Atlas) |
| **Authentication** | better-auth (Email + Google OAuth) |
| **AI Assistant** | Groq API + Llama 3.1 |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **Deployment** | Vercel (Client), Render (Server) |

---

## 📁 Project Structure

```
fooh-client/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Home page
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── login/              # Login page
│   │   ├── register/           # Registration page
│   │   ├── explore/            # Menu exploration with filters
│   │   ├── cart/               # Shopping cart
│   │   ├── orders/             # Order tracking
│   │   ├── admin/              # Admin dashboard with charts
│   │   ├── items/              # Item details, add, manage
│   │   ├── categories/         # Category add, edit, manage
│   │   ├── about/              # About Us
│   │   ├── careers/            # Careers
│   │   ├── press/              # Press
│   │   ├── help/               # Help Center
│   │   ├── safety/             # Safety
│   │   ├── terms/              # Terms of Service
│   │   └── privacy/            # Privacy Policy
│   ├── components/
│   │   ├── chat/               # AI Chat widget
│   │   ├── home/               # Home page sections
│   │   ├── layout/             # Navbar, Footer
│   │   └── ui/                 # Reusable UI components
│   ├── contexts/               # Auth & Cart context providers
│   ├── hooks/                  # Custom data-fetching hooks
│   ├── lib/                    # Auth client config
│   └── types/                  # TypeScript interfaces
└── public/                     # Static assets
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Google Cloud Console credentials (for Google OAuth)
- Groq API key (for AI chat)

### Installation

```bash
# Clone the repository
git clone https://github.com/nufayer/fooh-client.git
cd fooh-client

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
```

### Environment Variables

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Running the Project

```bash
# Start client (port 3000)
npm run dev

# In a separate terminal, start the server
cd ../fooh-server
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@fooh.com | admin123 |
| Customer | Register with any email | Any password |

---

## 📸 Pages Overview

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero slider, features, categories, popular items, testimonials, FAQ |
| Explore | `/explore` | Full menu with search, filters, sorting, pagination |
| Categories | `/explore?view=categories` | Browse food categories |
| Item Details | `/items/[id]` | Item gallery, description, reviews, add to cart |
| Cart | `/cart` | Cart items, quantity controls, order summary |
| Orders | `/orders` | Order history with status tracking |
| Admin Dashboard | `/admin` | Sales charts, revenue stats, recent orders |
| Add Item | `/items/add` | Admin form to create menu items |
| Manage Items | `/items/manage` | Admin table to view/edit/delete items |
| Add Category | `/categories/add` | Admin form to create categories |
| Manage Categories | `/categories/manage` | Admin table to view/edit/delete categories |
| AI Chat | Floating widget | Ask about menu, get recommendations |

---

## 🎨 Design

- **Dark Theme** with custom color palette:
  - Primary Orange: `#FF6B35`
  - Secondary Red: `#E63946`
  - Accent Gold: `#FFD700`
- **Custom scrollbar** and smooth animations
- **Responsive design** for all screen sizes
- **Reusable UI components** (Button, Input, Select, FoodCard, Skeleton, Avatar)

---

## 🤖 AI Chat Assistant

The chat widget is powered by **Groq API** with **Llama 3.1** model:
- Context-aware — knows all menu items, prices, and categories
- Suggested follow-up prompts
- Typewriter effect for responses
- Conversation history within session

---

## 📦 Key Dependencies

| Package | Purpose |
|---------|---------|
| `next` | React framework |
| `react` | UI library |
| `tailwindcss` | Utility-first CSS |
| `better-auth` | Authentication |
| `recharts` | Charts & graphs |
| `lucide-react` | Icons |
| `react-hot-toast` | Notifications |
| `mongodb` | Database driver |

---

## 🚢 Deployment

### Client (Vercel)
1. Push to GitHub
2. Import repository on [Vercel](https://vercel.com)
3. Set environment variable: `NEXT_PUBLIC_API_URL`
4. Deploy

### Server (Render)
1. Push to GitHub
2. Create Web Service on [Render](https://render.com)
3. Build command: `npm install && npm run build`
4. Start command: `npm start`
5. Set environment variables (see `.env.example`)

---

## 👨‍💻 Author

**Nufayer Mahmud**
- GitHub: [nufayer](https://github.com/nufayer)
- LinkedIn: [nufayer-mahmud009](https://www.linkedin.com/in/nufayer-mahmud009)
- Facebook: [nufayer.mahmud](https://www.facebook.com/nufayer.mahmud)

---

## 📄 License

This project is for educational purposes.

---

<div align="center">

**Made with ❤️ by Nufayer**

</div>
