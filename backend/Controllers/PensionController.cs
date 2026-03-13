using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PensionCalculator.Data;
using PensionCalculator.Models;
using PensionCalculator.Services;

namespace PensionCalculator.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class PensionController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly PensionService _pensionService;

        public PensionController(AppDbContext context,
            PensionService pensionService)
        {
            _context = context;
            _pensionService = pensionService;
        }

        // POST: api/pension/calculate
        [HttpPost("calculate")]
        public async Task<IActionResult> Calculate(
            [FromBody] PensionCalculation request)
        {
            var employeeId = int.Parse(User.FindFirst(
                System.Security.Claims.ClaimTypes.NameIdentifier)!.Value);

            request.EmployeeId = employeeId;
            request.EstimatedMonthlyPension = _pensionService.Calculate(
                request.AnnualSalary,
                request.ContributionPercentage,
                request.YearsOfService
            );
            request.CalculatedAt = DateTime.UtcNow;

            _context.PensionCalculations.Add(request);
            await _context.SaveChangesAsync();

            return Ok(request);
        }

        // GET: api/pension/history
        [HttpGet("history")]
        public async Task<IActionResult> GetHistory()
        {
            var employeeId = int.Parse(User.FindFirst(
                System.Security.Claims.ClaimTypes.NameIdentifier)!.Value);

            var history = await _context.PensionCalculations
                .Where(p => p.EmployeeId == employeeId)
                .OrderByDescending(p => p.CalculatedAt)
                .ToListAsync();
            return Ok(history);
        }

        // GET: api/pension/history/{id}
        [HttpGet("history/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var employeeId = int.Parse(User.FindFirst(
                System.Security.Claims.ClaimTypes.NameIdentifier)!.Value);

            var calculation = await _context.PensionCalculations
                .FirstOrDefaultAsync(p => p.Id == id && 
                    p.EmployeeId == employeeId);

            if (calculation == null)
                return NotFound($"No calculation found with ID {id}");
            return Ok(calculation);
        }
    }
}