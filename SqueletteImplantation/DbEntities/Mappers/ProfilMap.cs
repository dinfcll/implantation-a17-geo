using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SqueletteImplantation.DbEntities.Models;

namespace SqueletteImplantation.DbEntities.Mappers
{
    public class ProfilMap
    {
        public ProfilMap(EntityTypeBuilder<Profil> entityBuilder)
        {
            entityBuilder.HasKey(m => m.id);
            entityBuilder.Property(m => m.courriel).IsRequired();
            entityBuilder.Property(m => m.username).IsRequired();
            entityBuilder.Property(m => m.prenom);
            entityBuilder.Property(m => m.nom);
        }
    }
}