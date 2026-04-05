# Data Architecture

## Overview
This application uses Microsoft SQL Server running in a Docker container
with Entity Framework Core as the ORM layer. The schema follows a
relational design with a one-to-many relationship between employees and
their pension calculations, supporting role-based access control for
both members and administrators.

## Schema

### Employees Table

| Column       | Type           | Constraints             |
|--------------|----------------|-------------------------|
| Id           | INT            | PK, Auto-Increment      |
| Name         | NVARCHAR(MAX)  | NOT NULL                |
| Email        | NVARCHAR(450)  | NOT NULL, UNIQUE        |
| PasswordHash | NVARCHAR(MAX)  | NOT NULL                |
| Role         | NVARCHAR(MAX)  | NOT NULL, DEFAULT 'Employee' |
| Department   | NVARCHAR(MAX)  | NOT NULL                |
| DateOfBirth  | DATETIME2      | NOT NULL                |
| HireDate     | DATETIME2      | NOT NULL                |

### PensionCalculations Table

| Column                  | Type          | Constraints          |
|-------------------------|---------------|----------------------|
| Id                      | INT           | PK, Auto-Increment   |
| EmployeeId              | INT           | FK → Employees(Id)   |
| AnnualSalary            | DECIMAL(18,2) | NOT NULL             |
| ContributionPercentage  | DECIMAL(5,2)  | NOT NULL             |
| YearsOfService          | INT           | NOT NULL             |
| EstimatedMonthlyPension | DECIMAL(18,2) | NOT NULL             |
| CalculatedAt            | DATETIME2     | NOT NULL             |

### Relationships
One Employee has many PensionCalculations (one-to-many). The foreign
key constraint is enforced at the database level with cascade delete —
removing an employee automatically removes all their calculations,
preventing orphaned records.

## Design Decisions

**Relational model over flat structure** — PensionCalculation originally
had a Name column. This was moved to Employee because employee details
belong on the employee record, not duplicated in every calculation. This
follows database normalization principles and means a name change only
requires updating one record.

**DECIMAL(18,2) for monetary values** — avoids floating point precision
errors that are unacceptable in financial calculations. double and float
types can produce errors like 0.1 + 0.2 = 0.30000000000000004. This is
standard practice in pension and benefits systems.

**DECIMAL(5,2) for percentages** — supports values from 0.00 to 999.99,
which is more than sufficient for contribution rates.

**CalculatedAt stored in UTC** — ensures consistent timestamps regardless
of server timezone, important for any system handling data across regions.

**No soft deletes** — calculation history is append-only by design.
Past calculations should be preserved as an accurate audit trail.

**Unique index on Email** — enforced at the database level via
HasIndex(e => e.Email).IsUnique() in the Fluent API. Prevents duplicate
accounts and enables efficient lookups during authentication.

**[JsonIgnore] on navigation property** — the Employee navigation
property on PensionCalculation is marked with [JsonIgnore] to prevent
circular reference errors during JSON serialization. Without this,
the serializer would follow Employee → PensionCalculations → Employee
infinitely. The relationship still exists in the database — it is
simply excluded from API responses. In a production system this would
be solved more formally using DTOs (Data Transfer Objects) that
explicitly define the shape of API responses.

**Passwords stored as BCrypt hashes** — plain text passwords are never
stored. BCrypt hashes are one-way — even if the database were
compromised, original passwords could not be recovered.

**Role stored as string** — the Role column stores "Employee" or "Admin"
as a plain string rather than an enum or foreign key to a roles table.
This is intentionally simple for a demo project. A production system
would use a proper roles and permissions table.

## Entity Framework Core
Schema is code-first using EF Core migrations. The AppDbContext class
defines column types explicitly via Fluent API rather than relying on
defaults, ensuring precision and consistency across environments.

Migrations applied:
- InitialCreate — created PensionCalculations table
- AddEmployeeModel — added Employees table, foreign key, removed Name
  column from PensionCalculations

## Local Development
Database runs in a Docker container for environment consistency
and to avoid LocalDB limitations on non-Windows machines.
```bash
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=YourStrong@Passw0rd" \
  -p 1433:1433 --name pension-sqlserver \
  -d mcr.microsoft.com/mssql/server:2022-latest
```

If the container already exists but is stopped:
```bash
docker start pension-sqlserver
```

## Frontend Integration

### API URL Configuration
The frontend uses an environment variable for the API base URL:
- Development: `http://localhost:5269`
- Production: `https://api.westgatepension.may-nguyen.ca`

### CORS Policy
Configured to allow requests from localhost:5173 (development) and westgatepension.may-nguyen.ca (production).

### Circular Reference Prevention
The one-to-many relationship between Employee and PensionCalculation
creates a circular reference when serializing to JSON:
```
Employee → PensionCalculations → Employee → PensionCalculations → ...
```
This is resolved by marking the Employee navigation property on
PensionCalculation with [JsonIgnore] and making it nullable (Employee?)
to prevent model validation errors. The production solution would be
DTOs that explicitly define response shapes without navigation properties.

### Demo Environment
Seed data provides realistic demo accounts for portfolio demonstration.
All accounts use Password123! for simplicity. In a real production
system passwords would meet complexity requirements and be changed
on first login.