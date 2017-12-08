using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace squeletteimplantation.Migrations
{
    public partial class UpdatePost : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "postComment",
                table: "PostsUser",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "postComment",
                table: "PostsUser");
        }
    }
}
