# Pension Calculator — Frontend

A React + TypeScript frontend for the Westgate Pension administration
system. Features a member portal for employees to view and calculate
their pension, and an admin portal for organization-wide oversight.

## Tech Stack
- React 18
- TypeScript
- Vite
- Tailwind CSS v4
- Axios (HTTP client with JWT interceptor)
- React Router v6

## Project Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── Button.tsx          # Reusable button with variants
│   │   ├── Card.tsx            # Reusable card container
│   │   ├── Input.tsx           # Reusable labeled input
│   │   ├── LoadingSpinner.tsx  # Loading state
│   │   ├── Navbar.tsx          # Shared navigation bar
│   │   ├── PensionForm.tsx     # Pension calculation form
│   │   ├── CalculationHistory.tsx # Calculation history table
│   │   ├── StatCard.tsx        # Stat display card
│   │   └── PrivateRoute.tsx    # Auth-protected route wrapper
│   ├── hooks/
│   │   └── useEmployee.ts      # Custom hook for employee data fetching
│   ├── pages/
│   │   ├── LoginPage.tsx       # Login page
│   │   ├── EmployeeDashboard.tsx # Member portal
│   │   └── AdminDashboard.tsx  # Admin portal
│   ├── services/
│   │   └── api.ts              # Axios instance with JWT interceptor
│   ├── main.tsx                # App entry point and routing
│   └── index.css               # Tailwind imports and design tokens
```

## Design System
Colors are defined as design tokens in `index.css` using Tailwind's
theme system. Changing the color scheme requires editing one file:
```css
@theme {
  --color-brand-navy: #1c2b3a;
  --color-brand-gold: #c4a472;
  --color-brand-gold-dark: #b8956a;
  --color-brand-muted: #7a8fa0;
  --color-brand-border: #3a4f63;
  --color-brand-bg: #f5f2ee;
  --color-brand-card: #e8e4df;
}
```

## Component Architecture
Components are kept under 100 lines and follow a single responsibility
principle. Shared UI primitives (Button, Card, Input) are composed into
feature components (PensionForm, CalculationHistory) which are then
composed into pages (EmployeeDashboard).

## Prerequisites
- Node.js 18+
- Backend API running at `http://localhost:5269`

## Setup
```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## Environment Variables
For production, set the API URL via environment variable:
```
VITE_API_URL=https://api.westgatepension.may-nguyen.ca
```

## Authentication Flow
1. User logs in via `/login` — receives JWT token
2. Token stored in localStorage
3. Axios interceptor attaches token to every request automatically
4. Role stored in localStorage — Admin redirected to `/admin`,
   Employee redirected to `/dashboard`
5. Sign out clears localStorage and redirects to `/login`
