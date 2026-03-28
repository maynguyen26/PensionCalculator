# Pension Calculator — Frontend

A React + TypeScript frontend for the Westgate Pension administration
system. Features a member portal for employees to view and calculate
their pension, and an admin portal for organization-wide oversight.
Fully mobile responsive.

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
│   │   ├── Button.tsx              # Reusable button with primary/secondary/danger variants
│   │   ├── Card.tsx                # Reusable card container with optional title
│   │   ├── Input.tsx               # Reusable labeled input field
│   │   ├── LoadingSpinner.tsx      # Animated loading state
│   │   ├── Navbar.tsx              # Shared navigation bar with mobile hamburger menu
│   │   ├── StatCard.tsx            # Stat display card with accent color option
│   │   ├── PensionForm.tsx         # Pension calculation form
│   │   ├── CalculationHistory.tsx  # Calculation history table
│   │   ├── EmployeeTable.tsx       # Admin employee list with search
│   │   ├── EmployeeDetail.tsx      # Admin employee detail overlay panel
│   │   └── PrivateRoute.tsx        # Auth-protected route wrapper
│   ├── hooks/
│   │   ├── useEmployee.ts          # Custom hook for employee profile and calculations
│   │   └── useAdminData.ts         # Custom hook for admin employee list and stats
│   ├── pages/
│   │   ├── LoginPage.tsx           # Login page with demo credentials
│   │   ├── EmployeeDashboard.tsx   # Member portal
│   │   └── AdminDashboard.tsx      # Admin portal with employee overview
│   ├── services/
│   │   └── api.ts                  # Axios instance with JWT interceptor
│   ├── main.tsx                    # App entry point and routing
│   └── index.css                   # Tailwind imports and design tokens
```

## Design System
Colors are defined as design tokens in `index.css` using Tailwind's
theme system. Changing the entire color scheme requires editing one file:
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
feature components (PensionForm, CalculationHistory, EmployeeTable) which
are then composed into pages (EmployeeDashboard, AdminDashboard).

Custom hooks separate data fetching logic from UI components entirely —
pages are responsible only for layout and composition, never for API calls.

## Mobile Responsive Design
All pages are fully responsive using Tailwind's breakpoint prefixes:
- `grid-cols-1 md:grid-cols-2` — stacks on mobile, side by side on desktop
- `hidden md:flex` — hides elements on mobile
- `px-6 md:px-10` — reduced padding on mobile
- `overflow-x-auto` — horizontal scroll on tables for small screens
- Navbar includes an animated hamburger menu on mobile

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

Update `src/services/api.ts` to use the environment variable:
```typescript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5269',
})
```

## Authentication Flow
1. User logs in via `/login` — receives JWT token
2. Token and role stored in localStorage
3. Axios interceptor attaches token to every request automatically
4. Role determines redirect — Admin to `/admin`, Employee to `/dashboard`
5. `PrivateRoute` component protects all authenticated routes
6. Sign out clears localStorage and redirects to `/login`

## Demo Credentials
The login page displays demo credentials for employers and visitors:

| Email | Password | Role |
|-------|----------|------|
| admin@westgate-pension.ca | Password123! | Admin |
| may.nguyen@westgate-pension.ca | Password123! | Employee |
