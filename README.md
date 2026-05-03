# 🏃 Treadmill Tracker

A full-stack web application to track and visualize calories burned during treadmill workouts. Built with **React** (frontend) and **Laravel** (backend API).

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Laravel](https://img.shields.io/badge/Laravel-11.x-red.svg)
![React](https://img.shields.io/badge/React-18.x-blue.svg)

---

## ✨ Features

- 🔐 **Authentication** — Register, login and logout with Laravel Sanctum
- 🏋️ **Workout sessions** — Log treadmill sessions with multiple intervals (speed, incline, duration)
- 🔥 **Real-time kcal calculation** — Based on the ACSM MET formula (walking & running)
- 📊 **Live chart** — Visualize cumulative kcal and speed over time while filling the form
- 📋 **Session history** — Browse all past sessions with filters by date and minimum kcal
- 📈 **Progress dashboard** — Aggregate stats (total kcal, sessions, average speed) and bar chart over time
- 🔍 **Session detail** — Full breakdown with chart and interval table

---

## 🧮 Calorie Calculation

Calories are estimated using the **ACSM MET formula**:

```
kcal/min = MET × weight(kg) × 3.5 / 200
```

The MET value is computed differently based on activity type:

- **Walking** (< 8 km/h): `MET = (0.1 × speed_m/min + 1.8 × speed_m/min × incline + 3.5) / 3.5`
- **Running** (≥ 8 km/h): `MET = (0.2 × speed_m/min + 0.9 × speed_m/min × incline + 3.5) / 3.5`

---

## 🗂 Project Structure

```
treadmill-tracker/          # React frontend (Vite)
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── ProgressChart.jsx
│   │   ├── SessionChart.jsx
│   │   ├── SessionFilters.jsx
│   │   ├── StatsCards.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/            # Auth context and hooks
│   │   ├── AuthContext.js
│   │   ├── AuthProvider.jsx
│   │   └── useAuth.js
│   ├── lib/
│   │   └── axios.js        # Axios instance with auth interceptor
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── NewSession.jsx
│   │   └── SessionDetail.jsx
│   └── utils/
│       └── kcalCalculator.js   # MET-based calorie engine

treadmill-tracker-api/      # Laravel backend (API only)
├── app/
│   ├── Http/Controllers/Api/
│   │   ├── AuthController.php
│   │   └── WorkoutSessionController.php
│   ├── Models/
│   │   ├── User.php
│   │   ├── WorkoutSession.php
│   │   └── SessionInterval.php
│   └── Policies/
│       └── WorkoutSessionPolicy.php
├── database/migrations/
│   ├── create_workout_sessions_table.php
│   └── create_session_intervals_table.php
└── routes/
    └── api.php
```

---

## 🚀 Getting Started

### Prerequisites

- macOS with [Laravel Herd](https://herd.laravel.com) installed
- PHP 8.2+
- Composer
- Node.js 18+ and npm

### Backend Setup

```bash
# Clone the repo and navigate to backend
cd treadmill-tracker-api

# Install PHP dependencies
composer install

# Copy environment file
cp .env.example .env

# Configure SQLite in .env
DB_CONNECTION=sqlite

# Create the SQLite database file
touch database/database.sqlite

# Generate app key
php artisan key:generate

# Run migrations
php artisan migrate

# Install Sanctum
php artisan install:api
```

Make sure `bootstrap/app.php` includes the API routes:

```php
->withRouting(
    web: __DIR__.'/../routes/web.php',
    api: __DIR__.'/../routes/api.php',
    commands: __DIR__.'/../routes/console.php',
    health: '/up',
)
```

The API will be available at `http://treadmill-tracker-api.test`.

### Frontend Setup

```bash
# Navigate to frontend
cd treadmill-tracker

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🔌 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/register` | ❌ | Register a new user |
| POST | `/api/login` | ❌ | Login and get token |
| POST | `/api/logout` | ✅ | Logout current user |
| GET | `/api/user` | ✅ | Get authenticated user |
| GET | `/api/workout-sessions` | ✅ | List all sessions |
| POST | `/api/workout-sessions` | ✅ | Create a new session |
| GET | `/api/workout-sessions/{id}` | ✅ | Get session detail |
| DELETE | `/api/workout-sessions/{id}` | ✅ | Delete a session |

---

## 🗄 Database Schema

```
users
├── id, name, email, password, timestamps

workout_sessions
├── id, user_id (FK)
├── weight_kg, age, gender
├── duration_seconds, avg_speed_kmh, incline_percent
├── total_kcal, timestamps

session_intervals
├── id, workout_session_id (FK)
├── start_second, end_second
├── speed_kmh, incline_percent
├── kcal, timestamps
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, React Router, Recharts, Axios |
| Backend | Laravel 11, Laravel Sanctum |
| Database | SQLite (development) |
| Auth | Token-based via Laravel Sanctum |
| Local env | Laravel Herd (macOS) |

---

## 📋 Roadmap

- [x] M1 — Project setup & architecture
- [x] M2 — MET-based calorie calculation engine
- [x] M3 — Authentication (register, login, logout)
- [x] M4 — Session form with live chart
- [x] M5 — Session history & detail
- [x] M6 — Advanced dashboard with stats and filters
- [ ] M7 — Advanced features (GPX/CSV import, EPOC estimate, HR zones, PDF export)
- [ ] UI Redesign — Design system, dark mode, animations

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
