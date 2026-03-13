using Microsoft.EntityFrameworkCore;
using PensionCalculator.Models;

namespace PensionCalculator.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<PensionCalculation> PensionCalculations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PensionCalculation>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.AnnualSalary)
                    .HasColumnType("decimal(18,2)");
                entity.Property(e => e.ContributionPercentage)
                    .HasColumnType("decimal(5,2)");
                entity.Property(e => e.EstimatedMonthlyPension)
                    .HasColumnType("decimal(18,2)");
                entity.HasOne(e => e.Employee)
                    .WithMany(e => e.PensionCalculations)
                    .HasForeignKey(e => e.EmployeeId)
                    .OnDelete(DeleteBehavior.Cascade);
            });
            modelBuilder.Entity<Employee>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasIndex(e => e.Email).IsUnique();
                entity.Property(e => e.Role).HasDefaultValue("Employee");
            });
        }
    }
}