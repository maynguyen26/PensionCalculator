# Pension Calculator API

A RESTful API built with ASP.NET Core and SQL Server for estimating
monthly pension payouts based on salary, contribution rate, and
years of service. Built to demonstrate .NET development, OOP design
patterns, and SQL Server integration.

## Tech Stack
- ASP.NET Core Web API (.NET 8)
- C# with OOP principles
- Entity Framework Core (Code-First)
- Microsoft SQL Server (Docker)

## Prerequisites
- .NET 8 SDK
- Docker Desktop (for SQL Server container)

## Setup
1. Clone the repository
2. Start the database:
```bash
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=YourStrong@Passw0rd" \
  -p 1433:1433 --name pension-sqlserver \
  -d mcr.microsoft.com/mssql/server:2022-latest
```
2. Run `dotnet restore`
3. Run `dotnet ef database update`
4. Run `dotnet run`

## API Endpoints

| Method | Endpoint                    | Description                    |
|--------|-----------------------------|--------------------------------|
| POST   | /api/pension/calculate      | Calculate and save a pension   |
| GET    | /api/pension/history        | Get all past calculations      |
| GET    | /api/pension/history/{id}   | Get a specific calculation     |

## Example Request
POST /api/pension/calculate
```json
{
  "name": "May Nguyen",
  "annualSalary": 65000,
  "contributionPercentage": 5,
  "yearsOfService": 30
}
```

## Data Architecture
See [Docs/DATA_ARCHITECTURE.md](Docs/DATA_ARCHITECTURE.md) for full
schema design and design decision rationale.