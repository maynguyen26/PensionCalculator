# Pension Calculator — Backend API

A RESTful API built with ASP.NET Core and SQL Server for administering
pension calculations with role-based access control. Features JWT
authentication, an Employee/Admin portal system, and a full calculation
history per member. Built to demonstrate .NET development, OOP design
patterns, layered architecture, and SQL Server integration.

## Tech Stack
- ASP.NET Core Web API (.NET 10)
- C# with OOP principles
- Entity Framework Core (Code-First)
- Microsoft SQL Server (Docker)
- JWT Authentication with BCrypt password hashing
- Scalar API documentation

## Project Structure
```
backend/
├── Controllers/
│   ├── AuthController.cs       # Register and login
│   ├── EmployeeController.cs   # Employee management (Admin) + profile (Employee)
│   └── PensionController.cs    # Pension calculations and history
├── Data/
│   ├── AppDbContext.cs         # EF Core database context
│   └── SeedData.cs             # Mock employees and calculation history
├── Migrations/                 # EF Core migration history
├── Models/
│   ├── Employee.cs             # Employee entity
│   └── PensionCalculation.cs   # Pension calculation entity
├── Services/
│   ├── PensionService.cs       # Pension calculation business logic
│   └── TokenService.cs         # JWT token generation
├── Docs/
│   └── DATA_ARCHITECTURE.md    # Schema design and decision rationale
├── Program.cs                  # App configuration and middleware
└── appsettings.json            # App configuration (no secrets)
```

## Prerequisites
- .NET 10 SDK
- Docker Desktop

## Configuration
This project uses .NET User Secrets for local development to keep
credentials out of source control.

After cloning, set up your secrets:
```bash
dotnet user-secrets init
dotnet user-secrets set "ConnectionStrings:DefaultConnection" \
  "Server=localhost,1433;Database=PensionCalculatorDb;User Id=sa;Password=<your-password>;TrustServerCertificate=True;"
dotnet user-secrets set "JwtSettings:SecretKey" "<your-secret-key-min-32-chars>"
```

In production, use environment variables or Azure Key Vault instead.

## Setup
1. Clone the repository
2. Start the database:
```bash
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=YourStrong@Passw0rd" \
  -p 1433:1433 --name pension-sqlserver \
  -d mcr.microsoft.com/mssql/server:2022-latest
```
If the container already exists but is stopped:
```bash
docker start pension-sqlserver
```
3. Navigate to the backend folder:
```bash
cd backend
```
4. Restore dependencies:
```bash
dotnet restore
```
5. Apply migrations:
```bash
dotnet ef database update
```
6. Run the API:
```bash
dotnet run
```

The API will be available at `http://localhost:5269` and the Scalar
API docs at `http://localhost:5269/scalar/v1`.

Seed data is automatically applied on first run — 1 admin and 6
employees with calculation history.

## Seed Accounts
| Email | Password | Role |
|-------|----------|------|
| admin@westgate-pension.ca | Password123! | Admin |
| may.nguyen@westgate-pension.ca | Password123! | Employee |
| james.tran@westgate-pension.ca | Password123! | Employee |
| sarah.mitchell@westgate-pension.ca | Password123! | Employee |
| david.chen@westgate-pension.ca | Password123! | Employee |
| priya.sharma@westgate-pension.ca | Password123! | Employee |
| tom.kowalski@westgate-pension.ca | Password123! | Employee |

## API Endpoints

### Auth (Public)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register a new employee |
| POST | /api/auth/login | Login and receive JWT token |

### Employee (Authenticated)
| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| GET | /api/employee | Get all employees | Admin |
| GET | /api/employee/{id} | Get employee by ID | Admin |
| GET | /api/employee/me | Get own profile | Any |
| DELETE | /api/employee/{id} | Delete employee | Admin |

### Pension (Authenticated)
| Method | Endpoint | Description | Role |
|--------|----------|-------------|------|
| POST | /api/pension/calculate | Calculate and save pension | Any |
| GET | /api/pension/history | Get own calculation history | Any |
| GET | /api/pension/history/{id} | Get calculation by ID | Any |

## Authentication
All pension and employee endpoints require a Bearer token. Obtain
a token by logging in via POST /api/auth/login, then include it
in the Authorization header:
```
Authorization: Bearer <your-token>
```

Tokens expire after 24 hours. Employees can only access their own
data — EmployeeId is read from the token, not from the request.

## Data Architecture
See [Docs/DATA_ARCHITECTURE.md](Docs/DATA_ARCHITECTURE.md) for full
schema design and decision rationale.