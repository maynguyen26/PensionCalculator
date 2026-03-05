using PensionCalculator.Models;

namespace PensionCalculator.Data
{
    public static class SeedData
    {
        public static async Task InitializeAsync(AppDbContext context)
        {
            if (context.Employees.Any())
                return;

            var employees = new List<Employee>
            {
                new Employee
                {
                    Name = "Admin User",
                    Email = "admin@westgate-pension.ca",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123!"),
                    Role = "Admin",
                    Department = "Administration",
                    DateOfBirth = new DateTime(1975, 3, 12),
                    HireDate = new DateTime(2000, 1, 15)
                },
                new Employee
                {
                    Name = "May Nguyen",
                    Email = "may.nguyen@westgate-pension.ca",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123!"),
                    Role = "Employee",
                    Department = "Engineering",
                    DateOfBirth = new DateTime(2000, 3, 5),
                    HireDate = new DateTime(2018, 3, 1)
                },
                new Employee
                {
                    Name = "Matthew Page",
                    Email = "matthew.page@westgate-pension.ca",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123!"),
                    Role = "Employee",
                    Department = "Actuarial",
                    DateOfBirth = new DateTime(1997, 09, 27),
                    HireDate = new DateTime(2012, 7, 1)
                },
                new Employee
                {
                    Name = "Maria Lukic",
                    Email = "maria.lukic@westgate-pension.ca",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123!"),
                    Role = "Employee",
                    Department = "HR",
                    DateOfBirth = new DateTime(2000, 1, 17),
                    HireDate = new DateTime(2021, 2, 15)
                },
                new Employee
                {
                    Name = "Jack Park",
                    Email = "jack.park@westgate-pension.ca",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123!"),
                    Role = "Employee",
                    Department = "Engineering",
                    DateOfBirth = new DateTime(2001, 7, 18),
                    HireDate = new DateTime(2015, 5, 1)
                },
                new Employee
                {
                    Name = "Randy Chho",
                    Email = "randy.chhoa@westgate-pension.ca",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123!"),
                    Role = "Employee",
                    Department = "Finance",
                    DateOfBirth = new DateTime(1999, 8, 25),
                    HireDate = new DateTime(2017, 9, 1)
                },
                new Employee
                {
                    Name = "Samantha Mok",
                    Email = "samantha.mok@westgate-pension.ca",
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword("Password123!"),
                    Role = "Employee",
                    Department = "Actuarial",
                    DateOfBirth = new DateTime(2002, 3, 3),
                    HireDate = new DateTime(2009, 4, 1)
                }
            };

            context.Employees.AddRange(employees);
            await context.SaveChangesAsync();

            var calculations = new List<PensionCalculation>
            {
                new PensionCalculation { EmployeeId = 2, AnnualSalary = 85000, ContributionPercentage = 6, YearsOfService = 8, EstimatedMonthlyPension = 3400, CalculatedAt = DateTime.UtcNow.AddMonths(-6) },
                new PensionCalculation { EmployeeId = 2, AnnualSalary = 80000, ContributionPercentage = 6, YearsOfService = 7, EstimatedMonthlyPension = 2800, CalculatedAt = DateTime.UtcNow.AddMonths(-12) },
                new PensionCalculation { EmployeeId = 3, AnnualSalary = 95000, ContributionPercentage = 7, YearsOfService = 14, EstimatedMonthlyPension = 5550, CalculatedAt = DateTime.UtcNow.AddMonths(-3) },
                new PensionCalculation { EmployeeId = 3, AnnualSalary = 90000, ContributionPercentage = 7, YearsOfService = 13, EstimatedMonthlyPension = 4550, CalculatedAt = DateTime.UtcNow.AddMonths(-9) },
                new PensionCalculation { EmployeeId = 4, AnnualSalary = 72000, ContributionPercentage = 5, YearsOfService = 5, EstimatedMonthlyPension = 1500, CalculatedAt = DateTime.UtcNow.AddMonths(-2) },
                new PensionCalculation { EmployeeId = 5, AnnualSalary = 105000, ContributionPercentage = 8, YearsOfService = 11, EstimatedMonthlyPension = 7700, CalculatedAt = DateTime.UtcNow.AddMonths(-1) },
                new PensionCalculation { EmployeeId = 6, AnnualSalary = 88000, ContributionPercentage = 6, YearsOfService = 9, EstimatedMonthlyPension = 3960, CalculatedAt = DateTime.UtcNow.AddMonths(-4) },
                new PensionCalculation { EmployeeId = 7, AnnualSalary = 91000, ContributionPercentage = 7, YearsOfService = 17, EstimatedMonthlyPension = 9005, CalculatedAt = DateTime.UtcNow.AddMonths(-1) },
                new PensionCalculation { EmployeeId = 7, AnnualSalary = 85000, ContributionPercentage = 7, YearsOfService = 16, EstimatedMonthlyPension = 7933, CalculatedAt = DateTime.UtcNow.AddMonths(-13) },
            };

            context.PensionCalculations.AddRange(calculations);
            await context.SaveChangesAsync();
        }
    }
}