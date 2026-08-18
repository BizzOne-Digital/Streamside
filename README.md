# Streamside Bookkeeping — Full MERN Stack Website

**Client:** Wendy Stevens · www.streamsidebookkeeping.ca  
**Stack:** React 18 + Vite (frontend) · Node.js + Express + MongoDB (backend)

---

## Quick Start

### 1. Backend Setup

```bash
cd backend
cp .env.example .env
# Fill in MongoDB URI, Cloudinary keys, email credentials
npm install
npm run dev         # Runs on http://localhost:5000
```

### 2. Frontend Setup

```bash
cd frontend
cp .env.example .env
# VITE_API_URL=http://localhost:5000/api
npm install
npm run dev         # Runs on http://localhost:5173
```

---

## Admin Panel

**URL:** http://localhost:5173/admin  
**Email:** admin@streamsidebookkeeping.ca  
**Password:** Admin@Streamside2026

> **Important:** Change this password in Settings after first login.

---

## Required Credentials (backend .env)

| Variable | Where to get it |
|---|---|
| `MONGO_URI` | MongoDB Atlas → Connect → Drivers |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary Dashboard |
| `CLOUDINARY_API_KEY` | Cloudinary Dashboard → API Keys |
| `CLOUDINARY_API_SECRET` | Cloudinary Dashboard → API Keys |
| `EMAIL_USER` | Gmail address |
| `EMAIL_PASS` | Gmail → Manage Account → App Passwords |
| `JWT_SECRET` | Any long random string (32+ chars) |

---

## Project Structure

```
streamside/
├── backend/
│   ├── server.js           # Express app entry point
│   ├── .env.example        # Environment template
│   ├── config/
│   │   └── cloudinary.js   # Cloudinary + multer config
│   ├── models/             # Mongoose models
│   │   ├── User.js
│   │   ├── Contact.js
│   │   ├── Resource.js
│   │   ├── Service.js
│   │   ├── Testimonial.js
│   │   └── Settings.js
│   ├── controllers/        # Route handlers
│   ├── routes/             # Express routers
│   ├── middleware/
│   │   └── auth.js         # JWT protect + adminOnly
│   └── utils/
│       └── seedAdmin.js    # First-run seeder
│
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── src/
    │   ├── main.jsx
    │   ├── App.jsx          # Router config
    │   ├── index.css        # Global design system
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── utils/
    │   │   └── api.js       # Axios instance + all APIs
    │   ├── components/
    │   │   ├── layout/      # Navbar, Footer, Layout
    │   │   ├── sections/    # Hero, Pricing, Testimonials...
    │   │   └── admin/       # AdminLayout
    │   └── pages/
    │       ├── HomePage.jsx
    │       ├── AboutPage.jsx
    │       ├── ServicesPage.jsx
    │       ├── ResourcesPage.jsx
    │       ├── ContactPage.jsx
    │       ├── NotFoundPage.jsx
    │       └── admin/
    │           ├── LoginPage.jsx
    │           ├── DashboardPage.jsx
    │           ├── ContactsPage.jsx
    │           ├── ServicesAdminPage.jsx
    │           ├── ResourcesAdminPage.jsx
    │           ├── TestimonialsAdminPage.jsx
    │           └── SettingsAdminPage.jsx
```

---

## Deployment Notes

### Frontend (Vercel recommended)
1. Push `frontend/` to GitHub
2. Import to Vercel → Framework: Vite
3. Set env var: `VITE_API_URL=https://your-backend-url.com/api`
4. Add `vercel.json` for SPA routing:
```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

### Backend (Railway or Render recommended)
1. Push `backend/` to GitHub  
2. Create new service → add all `.env` variables  
3. Start command: `npm start`  
4. Update CORS in `server.js` to allow your Vercel domain

---

## Brand Reference

| Token | Value | Use |
|---|---|---|
| `--navy` | #1F3A5F | Primary headings, navbar |
| `--deep-blue` | #2C5282 | Gradient partner |
| `--green` | #2F855A | CTAs, accents, checks |
| `--green-light` | #68D391 | On dark backgrounds |
| `--grey-light` | #F7FAFC | Section backgrounds |

**Fonts:** Montserrat (headings, 400–800) · Open Sans (body)
