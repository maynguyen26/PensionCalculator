using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PensionCalculator.Data;
using PensionCalculator.Models;

namespace PensionCalculator.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class EmployeeController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EmployeeController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/employee
        // Admin only - get all employees
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAll()
        {
            var employees = await _context.Employees
                .Select(e => new
                {
                    e.Id,
                    e.Name,
                    e.Email,
                    e.Department,
                    e.Role,
                    e.HireDate,
                    e.DateOfBirth,
                    CalculationCount = e.PensionCalculations.Count()
                })
                .ToListAsync();

            return Ok(employees);
        }

        // GET: api/employee/{id}
        // Admin only - get specific employee with their calculation history
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetById(int id)
        {
            var employee = await _context.Employees
                .Include(e => e.PensionCalculations
                    .OrderByDescending(p => p.CalculatedAt))
                .FirstOrDefaultAsync(e => e.Id == id);

            if (employee == null)
                return NotFound($"No employee found with ID {id}");

            return Ok(employee);
        }

        // GET: api/employee/me
        // Any authenticated user - get their own profile
        [HttpGet("me")]
        public async Task<IActionResult> GetMe()
        {
            var employeeId = int.Parse(User.FindFirst(
                System.Security.Claims.ClaimTypes.NameIdentifier)!.Value);

            var employee = await _context.Employees
                .Include(e => e.PensionCalculations
                    .OrderByDescending(p => p.CalculatedAt))
                .FirstOrDefaultAsync(e => e.Id == employeeId);

            if (employee == null)
                return NotFound();

            return Ok(new
            {
                employee.Id,
                employee.Name,
                employee.Email,
                employee.Department,
                employee.Role,
                employee.HireDate,
                employee.DateOfBirth,
                employee.PensionCalculations
            });
        }

        // DELETE: api/employee/{id}
        // Admin only - delete an employee
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var employee = await _context.Employees.FindAsync(id);

            if (employee == null)
                return NotFound($"No employee found with ID {id}");

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return Ok($"Employee {employee.Name} deleted successfully.");
        }
    }
}