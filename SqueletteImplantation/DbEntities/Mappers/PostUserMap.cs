using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SqueletteImplantation.DbEntities.Models;

namespace SqueletteImplantation.DbEntities.Mappers
{
    public class PostUserMap
    {
        public PostUserMap(EntityTypeBuilder<PostUser> entityBuilder)
        {
            entityBuilder.HasKey(m => m.postId);
            entityBuilder.Property(m => m.postTitle).IsRequired();
            entityBuilder.Property(m => m.postText).IsRequired();
        }
    }
}