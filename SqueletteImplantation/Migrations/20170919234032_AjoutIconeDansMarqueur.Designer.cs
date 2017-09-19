using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using SqueletteImplantation.DbEntities;

namespace squeletteimplantation.Migrations
{
    [DbContext(typeof(MaBd))]
    [Migration("20170919234032_AjoutIconeDansMarqueur")]
    partial class AjoutIconeDansMarqueur
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

            modelBuilder.Entity("SqueletteImplantation.DbEntities.Models.Marqueur", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Desc");

                    b.Property<int>("Icone");

                    b.Property<decimal>("Latitude");

                    b.Property<decimal>("Longitude");

                    b.Property<string>("Nom")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Marqueur");
                });

            modelBuilder.Entity("SqueletteImplantation.DbEntities.Models.Utilisateur", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("email")
                        .IsRequired();

                    b.Property<string>("mdp")
                        .IsRequired();

                    b.HasKey("Id");

                    b.ToTable("Utilisateur");
                });
        }
    }
}
