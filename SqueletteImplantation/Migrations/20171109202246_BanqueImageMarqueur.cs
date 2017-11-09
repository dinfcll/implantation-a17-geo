using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace squeletteimplantation.Migrations
{
    public partial class BanqueImageMarqueur : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BanqueImage",
                table: "Marqueur",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BanqueImage",
                table: "Marqueur");
        }
    }
}
