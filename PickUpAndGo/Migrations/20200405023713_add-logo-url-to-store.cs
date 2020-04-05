using Microsoft.EntityFrameworkCore.Migrations;

namespace PickUpAndGo.Migrations
{
    public partial class addlogourltostore : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LogoUrl",
                table: "Stores",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LogoUrl",
                table: "Stores");
        }
    }
}
