using Microsoft.EntityFrameworkCore;
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
        public virtual DbSet<Following> Following { get; set; }
        public virtual DbSet<Comment> Comment { get; set; }

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
            new FollowingMap(modelBuilder.Entity<Following>());
            new CommentMap(modelBuilder.Entity<Comment>());

            modelBuilder.Entity<Utilisateur>().Property(m => m.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Marqueur>().Property(m => m.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Profil>().Property(m => m.profilId).ValueGeneratedOnAdd();
            modelBuilder.Entity<PostsUser>().Property(m => m.postId).ValueGeneratedOnAdd();
            modelBuilder.Entity<Following>().Property(m => m.id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Comment>().Property(m => m.commentId).ValueGeneratedOnAdd();
        }
    }
}
