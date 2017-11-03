using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace squeletteimplantation.Migrations
{
    public partial class AjoutImageProfil : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "profilimage",
                table: "Profil",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "profilimage",
                table: "Profil");
        }
    }
}
