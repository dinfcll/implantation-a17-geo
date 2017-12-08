using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SqueletteImplantation.DbEntities.Models;

namespace SqueletteImplantation.DbEntities.Mappers
{
    public class CommentMap
    {
        public CommentMap(EntityTypeBuilder<Comment> entityBuilder)
        {
            entityBuilder.HasKey(m => m.commentId);
            entityBuilder.Property(m => m.commentTxt).IsRequired();
        }
    }
}