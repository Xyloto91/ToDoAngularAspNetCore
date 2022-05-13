using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ToDoAngularAspNetCore.Infrastructure.Migrations
{
    public partial class AddCompletedDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CompletedDate",
                table: "ToDos",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CompletedDate",
                table: "ToDos");
        }
    }
}
