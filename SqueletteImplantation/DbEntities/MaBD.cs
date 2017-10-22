﻿using Microsoft.EntityFrameworkCore;
using SqueletteImplantation.DbEntities.Mappers;
using SqueletteImplantation.DbEntities.Models;
using System.Linq;

namespace SqueletteImplantation.DbEntities
{
    public class MaBd : DbContext
    {
        public virtual DbSet<Machin> Machin { get; set; }
        public virtual DbSet<Utilisateur> Utilisateur {get; set; }
        public virtual DbSet<Marqueur> Marqueur { get; set; }
        public virtual DbSet<Profil> Profil { get; set; }
        public virtual DbSet<PostsUser> PostsUser { get; set; }

        public MaBd(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            new MachinMap(modelBuilder.Entity<Machin>());
            new MarqueurMap(modelBuilder.Entity<Marqueur>());
            new UtilisateurMap(modelBuilder.Entity<Utilisateur>());
            new ProfilMap(modelBuilder.Entity<Profil>());
            new PostsUserMap(modelBuilder.Entity<PostsUser>());

            modelBuilder.Entity<Utilisateur>().Property(m => m.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Marqueur>().Property(m => m.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Profil>().Property(m => m.profilId).ValueGeneratedOnAdd();
            modelBuilder.Entity<PostsUser>().Property(m => m.postId).ValueGeneratedOnAdd();
        }
    }
}
