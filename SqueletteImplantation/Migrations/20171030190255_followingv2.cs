using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace squeletteimplantation.Migrations
{
    public partial class followingv2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Following",
                columns: table => new
                {
                    id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    FollowedId = table.Column<int>(nullable: false),
                    FollowerId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Following", x => x.id);
                    table.ForeignKey(
                        name: "FK_Following_Profil_FollowedId",
                        column: x => x.FollowedId,
                        principalTable: "Profil",
                        principalColumn: "profilId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Following_Profil_FollowerId",
                        column: x => x.FollowerId,
                        principalTable: "Profil",
                        principalColumn: "profilId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Following_FollowedId",
                table: "Following",
                column: "FollowedId");

            migrationBuilder.CreateIndex(
                name: "IX_Following_FollowerId",
                table: "Following",
                column: "FollowerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Following");
        }
    }
}
