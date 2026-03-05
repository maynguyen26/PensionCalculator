namespace PensionCalculator.Models
{
    public class PensionCalculation
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; } = null!;
        public decimal AnnualSalary { get; set; }
        public decimal ContributionPercentage { get; set; }
        public int YearsOfService { get; set; }
        public decimal EstimatedMonthlyPension { get; set; }
        public DateTime CalculatedAt { get; set; } = DateTime.UtcNow;
    }
}