# Data Architecture

## Overview
This application uses Microsoft SQL Server running in a Docker container
with Entity Framework Core as the ORM layer. The schema is intentionally 
simple, designed to store pension calculation inputs and results for 
historical reference.

## Schema

### PensionCalculations Table

| Column                   | Type           | Constraints      |
|--------------------------|----------------|------------------|
| Id                       | INT            | PK, Auto-Increment |
| Name                     | NVARCHAR(MAX)  | NOT NULL         |
| AnnualSalary             | DECIMAL(18,2)  | NOT NULL         |
| ContributionPercentage   | DECIMAL(5,2)   | NOT NULL         |
| YearsOfService           | INT            | NOT NULL         |
| EstimatedMonthlyPension  | DECIMAL(18,2)  | NOT NULL         |
| CalculatedAt             | DATETIME2      | NOT NULL         |

## Design Decisions

**DECIMAL(18,2) for monetary values** — avoids floating point precision
errors that are unacceptable in financial calculations. This is standard
practice in pension and benefits systems.

**DECIMAL(5,2) for percentages** — supports values from 0.00 to 999.99,
which is more than sufficient for contribution rates.

**CalculatedAt stored in UTC** — ensures consistent timestamps regardless
of server timezone, important for any system handling data across regions.

**No soft deletes** — calculation history is append-only by design.
Past calculations should be preserved as an accurate audit trail.

## Entity Framework Core
Schema is code-first using EF Core migrations. The AppDbContext class
defines column types explicitly via Fluent API rather than relying on
defaults, ensuring precision and consistency across environments.