using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PensionCalculator.Data;
using PensionCalculator.Models;
using PensionCalculator.Services;

namespace PensionCalculator.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly TokenService _tokenService;

        public AuthController(AppDbContext context, TokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        // POST: api/auth/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (await _context.Employees.AnyAsync(e => e.Email == request.Email))
                return BadRequest("An account with this email already exists.");

            var employee = new Employee
            {
                Name = request.Name,
                Email = request.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
                Role = request.Role ?? "Employee",
                Department = request.Department,
                DateOfBirth = request.DateOfBirth,
                HireDate = DateTime.UtcNow
            };

            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();

            var token = _tokenService.GenerateToken(employee);
            return Ok(new { token, employee.Id, employee.Name, employee.Role });
        }

        // POST: api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var employee = await _context.Employees
                .FirstOrDefaultAsync(e => e.Email == request.Email);

            if (employee == null || 
                !BCrypt.Net.BCrypt.Verify(request.Password, employee.PasswordHash))
                return Unauthorized("Invalid email or password.");

            var token = _tokenService.GenerateToken(employee);
            return Ok(new { token, employee.Id, employee.Name, employee.Role });
        }
    }

    public record RegisterRequest(
        string Name,
        string Email,
        string Password,
        string Department,
        DateTime DateOfBirth,
        string? Role
    );

    public record LoginRequest(string Email, string Password);
}