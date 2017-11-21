using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SqueletteImplantation.DbEntities.Models;

namespace SqueletteImplantation.DbEntities.Mappers
{
    public class PostsUserMap
    {
        public PostsUserMap(EntityTypeBuilder<PostsUser> entityBuilder)
        {
            entityBuilder.HasKey(m => m.postId);
            entityBuilder.Property(m => m.postTitle).IsRequired();
            entityBuilder.Property(m => m.postText).IsRequired();
            entityBuilder.Property(m => m.postLike);
            entityBuilder.Property(m => m.datePublication);
        }
    }
}