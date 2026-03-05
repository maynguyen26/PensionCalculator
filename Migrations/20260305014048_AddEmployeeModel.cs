using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PensionCalculator.Migrations
{
    /// <inheritdoc />
    public partial class AddEmployeeModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "PensionCalculations");

            migrationBuilder.AddColumn<int>(
                name: "EmployeeId",
                table: "PensionCalculations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false, defaultValue: "Employee"),
                    Department = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    HireDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PensionCalculations_EmployeeId",
                table: "PensionCalculations",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_Email",
                table: "Employees",
                column: "Email",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_PensionCalculations_Employees_EmployeeId",
                table: "PensionCalculations",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PensionCalculations_Employees_EmployeeId",
                table: "PensionCalculations");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropIndex(
                name: "IX_PensionCalculations_EmployeeId",
                table: "PensionCalculations");

            migrationBuilder.DropColumn(
                name: "EmployeeId",
                table: "PensionCalculations");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "PensionCalculations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
