using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace squeletteimplantation.Migrations
{
    public partial class AjoutTrajetMarqueur : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Trajetlat",
                table: "Marqueur",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Trajetlng",
                table: "Marqueur",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Trajetlat",
                table: "Marqueur");

            migrationBuilder.DropColumn(
                name: "Trajetlng",
                table: "Marqueur");
        }
    }
}
