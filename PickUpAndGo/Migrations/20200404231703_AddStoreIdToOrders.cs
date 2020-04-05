using Microsoft.EntityFrameworkCore.Migrations;

namespace PickUpAndGo.Migrations
{
    public partial class AddStoreIdToOrders : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "StoreId",
                table: "Orders",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StoreId",
                table: "Orders");
        }
    }
}
