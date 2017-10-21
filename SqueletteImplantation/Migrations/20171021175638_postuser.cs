using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace squeletteimplantation.Migrations
{
    public partial class postuser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.CreateTable(
                name: "PostsUser",
                columns: table => new
                {
                    postId = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    postText = table.Column<string>(nullable: false),
                    postTitle = table.Column<string>(nullable: false),
                    profilId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostsUser", x => x.postId);
                    table.ForeignKey(
                        name: "FK_PostsUser_Profil_profilId",
                        column: x => x.profilId,
                        principalTable: "Profil",
                        principalColumn: "profilId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PostsUser_profilId",
                table: "PostsUser",
                column: "profilId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PostsUser");

            migrationBuilder.CreateTable(
                name: "PostUser",
                columns: table => new
                {
                    postId = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    postText = table.Column<string>(nullable: false),
                    postTitle = table.Column<string>(nullable: false),
                    profilId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostUser", x => x.postId);
                    table.ForeignKey(
                        name: "FK_PostUser_Profil_profilId",
                        column: x => x.profilId,
                        principalTable: "Profil",
                        principalColumn: "profilId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PostUser_profilId",
                table: "PostUser",
                column: "profilId");
        }
    }
}
