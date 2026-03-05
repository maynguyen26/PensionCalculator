namespace PensionCalculator.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string Role { get; set; } = "Employee";
        public string Department { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public DateTime HireDate { get; set; }
        public ICollection<PensionCalculation> PensionCalculations { get; set; } 
            = new List<PensionCalculation>();
    }
}