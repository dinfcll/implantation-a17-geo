using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SqueletteImplantation.DbEntities.Models;

namespace SqueletteImplantation.DbEntities.Mappers
{
    public class FollowingMap
    {
        public FollowingMap(EntityTypeBuilder<Following> entityBuilder)
        {
            entityBuilder.HasKey(m => m.id);
            entityBuilder.Property(m => m.FollowerId);
            entityBuilder.Property(m => m.FollowedId);
        }

    }
}
