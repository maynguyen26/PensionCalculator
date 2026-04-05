# Westgate Pension Calculator

A full-stack pension administration platform built with ASP.NET Core and React. Employees can estimate their monthly pension payout based on salary, contribution rate, and years of service. Admins can manage all members and view organization-wide statistics.

**Live demo:** [westgatepension.may-nguyen.ca](https://westgatepension.may-nguyen.ca)

| Role | Email | Password |
|---|---|---|
| Admin | admin@westgate-pension.ca | Password123! |
| Employee | may.nguyen@westgate-pension.ca | Password123! |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | ASP.NET Core, .NET 10 |
| Database | SQL Server + Entity Framework Core 10 |
| Authentication | JWT Bearer tokens, BCrypt password hashing |
| API Docs | Scalar (OpenAPI) |
| Frontend | React 19, TypeScript, Tailwind CSS 4 |
| Build Tool | Vite 7 |
| HTTP Client | Axios |
| Routing | React Router v7 |
| Deployment | Azure (backend), Azure Static Web Apps (frontend) |

---

## Features

**Employee view:**
- Estimated monthly pension displayed prominently on dashboard
- Run new calculations with salary, contribution %, and years of service
- Full calculation history with timestamps

**Admin view:**
- Organization-wide stats: total members, total calculations, average years of service
- Searchable employee table with department filter
- View any employee's full profile and calculation history
- Delete employee accounts

---

## Architecture

The project is split into two independently deployable applications under a monorepo structure:

```
PensionCalculator/
├── backend/          # ASP.NET Core Web API
└── frontend/         # React + Vite SPA
```

**Backend** follows a standard controller → service → repository pattern. Business logic lives in `PensionService` and `TokenService`, keeping controllers thin. Entity Framework Core handles migrations and the database schema. On startup, the API automatically runs pending migrations and seeds demo data if the database is empty.

**Frontend** separates data-fetching logic into custom hooks (`useEmployee`, `useAdminData`), keeping pages and components focused on rendering. A JWT token stored in `localStorage` is attached to every API request via an Axios request interceptor. Protected routes redirect unauthenticated users to the login page.

**Pension formula:**
```
Monthly Pension = (Annual Salary × Contribution Rate × Years of Service) / 12
```

---

## API Endpoints

All endpoints require a valid JWT bearer token except auth routes.

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | None | Register a new employee |
| POST | `/api/auth/login` | None | Login and receive JWT |
| GET | `/api/employee` | Admin | Get all employees |
| GET | `/api/employee/{id}` | Admin | Get employee with calculation history |
| GET | `/api/employee/me` | Any | Get own profile |
| DELETE | `/api/employee/{id}` | Admin | Delete an employee |
| POST | `/api/pension/calculate` | Any | Run and save a pension calculation |
| GET | `/api/pension/history` | Any | Get own calculation history |

Interactive API documentation is available at `/scalar/v1` when running locally.

---

## Getting Started

**Prerequisites:** .NET 10 SDK, Node.js 20+, SQL Server (or Docker)

### Backend

```bash
cd backend

# Set up user secrets for local dev
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Server=localhost;Database=PensionDb;Trusted_Connection=True;"
dotnet user-secrets set "JwtSettings:SecretKey" "your-secret-key-at-least-32-chars"

# Run (migrations and seed data run automatically on startup)
dotnet run
```

API runs at `http://localhost:5269`. Scalar docs available at `http://localhost:5269/scalar/v1`.

### Frontend

```bash
cd frontend
npm install

# Create a .env.local file
echo "VITE_API_URL=http://localhost:5269" > .env.local

npm run dev
```

Frontend runs at `http://localhost:5173`.

---

## Available Scripts

**Backend:**
```bash
dotnet run          # Start API server
dotnet build        # Build the project
```

**Frontend:**
```bash
npm run dev         # Start dev server with HMR
npm run build       # Build for production
npm run lint        # Run ESLint
npm run preview     # Preview production build
```

---

## Source

[github.com/maynguyen26/PensionCalculator](https://github.com/maynguyen26/PensionCalculator)
