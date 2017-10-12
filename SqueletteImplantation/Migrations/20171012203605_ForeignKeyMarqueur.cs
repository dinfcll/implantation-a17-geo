using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.SqlServer.Server;

namespace squeletteimplantation.Migrations
{
    public partial class ForeignKeyMarqueur : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProfilId",
                table: "Marqueur",
                nullable: true,
                defaultValue: null);

            migrationBuilder.CreateIndex(
                name: "IX_Marqueur_ProfilId",
                table: "Marqueur",
                column: "ProfilId");

            migrationBuilder.AddForeignKey(
                name: "FK_Marqueur_Profil_ProfilId",
                table: "Marqueur",
                column: "ProfilId",
                principalTable: "Profil",
                principalColumn: "ProfilId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Marqueur_Profil_ProfilId",
                table: "Marqueur");

            migrationBuilder.DropIndex(
                name: "IX_Marqueur_ProfilId",
                table: "Marqueur");

            migrationBuilder.DropColumn(
                name: "ProfilId",
                table: "Marqueur");
        }
    }
}
