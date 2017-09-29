using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SqueletteImplantation.DbEntities.Models;

namespace SqueletteImplantation.DbEntities.Mappers
{
    public class UtilisateurMap
    {
        public UtilisateurMap(EntityTypeBuilder<Utilisateur> entityBuilder)
        {
            entityBuilder.HasKey(m => m.Id);
            entityBuilder.Property(m => m.email).IsRequired();
            entityBuilder.Property(m => m.mdp).IsRequired();
            entityBuilder.Property(m => m.mdp);
        }
    }
}