﻿using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using SqueletteImplantation.DbEntities;

namespace squeletteimplantation.Migrations
{
    [DbContext(typeof(MaBd))]
    partial class MaBdModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
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

                    b.Property<string>("Trajetlat");

                    b.Property<string>("Trajetlng");

                    b.Property<int>("profilId");

                    b.HasKey("Id");

                    b.HasIndex("profilId");

                    b.ToTable("Marqueur");
                });

            modelBuilder.Entity("SqueletteImplantation.DbEntities.Models.Profil", b =>
                {
                    b.Property<int>("profilId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("courriel")
                        .IsRequired();

                    b.Property<string>("nom");

                    b.Property<string>("prenom");

                    b.Property<string>("username")
                        .IsRequired();

                    b.HasKey("profilId");

                    b.ToTable("Profil");
                });

            modelBuilder.Entity("SqueletteImplantation.DbEntities.Models.Utilisateur", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("email")
                        .IsRequired();

                    b.Property<string>("mdp")
                        .IsRequired();

                    b.Property<bool>("reset");

                    b.Property<int>("typeutil");

                    b.HasKey("Id");

                    b.ToTable("Utilisateur");
                });

            modelBuilder.Entity("SqueletteImplantation.DbEntities.Models.Marqueur", b =>
                {
                    b.HasOne("SqueletteImplantation.DbEntities.Models.Profil", "Profil")
                        .WithMany()
                        .HasForeignKey("profilId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
