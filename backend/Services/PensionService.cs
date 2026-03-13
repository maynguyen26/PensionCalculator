using PensionCalculator.Models;

namespace PensionCalculator.Services
{
    public class PensionService
    {
        /// <summary>
        /// Calculates estimated monthly pension based on salary,
        /// contribution percentage, and years of service.
        /// Formula: (AnnualSalary * ContributionRate * YearsOfService) / 12
        /// </summary>
        public decimal Calculate(decimal annualSalary,
            decimal contributionPercentage, int yearsOfService)
        {
            decimal contributionRate = contributionPercentage / 100;
            decimal totalContributions =
                annualSalary * contributionRate * yearsOfService;
            return Math.Round(totalContributions / 12, 2);
        }
    }
}