using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace squeletteimplantation.Migrations
{
    public partial class renameFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Marqueur_Profil_ProfilId",
                table: "Marqueur");

            migrationBuilder.RenameColumn(
                name: "ProfilId",
                table: "Profil",
                newName: "profilId");

            migrationBuilder.RenameColumn(
                name: "ProfilId",
                table: "Marqueur",
                newName: "profilId");

            migrationBuilder.RenameIndex(
                name: "IX_Marqueur_ProfilId",
                table: "Marqueur",
                newName: "IX_Marqueur_profilId");

            migrationBuilder.AddForeignKey(
                name: "FK_Marqueur_Profil_profilId",
                table: "Marqueur",
                column: "profilId",
                principalTable: "Profil",
                principalColumn: "profilId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Marqueur_Profil_profilId",
                table: "Marqueur");

            migrationBuilder.RenameColumn(
                name: "profilId",
                table: "Profil",
                newName: "ProfilId");

            migrationBuilder.RenameColumn(
                name: "profilId",
                table: "Marqueur",
                newName: "ProfilId");

            migrationBuilder.RenameIndex(
                name: "IX_Marqueur_profilId",
                table: "Marqueur",
                newName: "IX_Marqueur_ProfilId");

            migrationBuilder.AddForeignKey(
                name: "FK_Marqueur_Profil_ProfilId",
                table: "Marqueur",
                column: "ProfilId",
                principalTable: "Profil",
                principalColumn: "ProfilId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
