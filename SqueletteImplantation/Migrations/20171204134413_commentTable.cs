using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace squeletteimplantation.Migrations
{
    public partial class commentTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "postComment",
                table: "PostsUser");

            migrationBuilder.CreateTable(
                name: "Comment",
                columns: table => new
                {
                    commentId = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    commentDate = table.Column<string>(nullable: true),
                    commentTxt = table.Column<string>(nullable: false),
                    postId = table.Column<int>(nullable: false),
                    profilId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comment", x => x.commentId);
                    table.ForeignKey(
                        name: "FK_Comment_PostsUser_postId",
                        column: x => x.postId,
                        principalTable: "PostsUser",
                        principalColumn: "postId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Comment_Profil_profilId",
                        column: x => x.profilId,
                        principalTable: "Profil",
                        principalColumn: "profilId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Comment_postId",
                table: "Comment",
                column: "postId");

            migrationBuilder.CreateIndex(
                name: "IX_Comment_profilId",
                table: "Comment",
                column: "profilId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Comment");

            migrationBuilder.AddColumn<string>(
                name: "postComment",
                table: "PostsUser",
                nullable: true);
        }
    }
}
