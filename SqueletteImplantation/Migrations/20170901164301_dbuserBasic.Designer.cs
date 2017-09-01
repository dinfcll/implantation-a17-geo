using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using SqueletteImplantation.DbEntities;

namespace squeletteimplantation.Migrations
{
    [DbContext(typeof(MaBd))]
    [Migration("20170901164301_dbuserBasic")]
    partial class dbuserBasic
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "1.1.2");

            modelBuilder.Entity("SqueletteImplantation.DbEntities.Models.Machin", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("NombreMagique");

                    b.Property<string>("Truc")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Machin");
                });
        }
    }
}
