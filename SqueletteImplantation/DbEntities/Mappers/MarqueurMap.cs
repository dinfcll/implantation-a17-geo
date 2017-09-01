using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SqueletteImplantation.DbEntities.Models;

namespace SqueletteImplantation.DbEntities.Mappers
{
    public class MarqueurMap
    {
        public MarqueurMap(EntityTypeBuilder<Marqueur> entityBuilder)
        {
            entityBuilder.HasKey(m => m.Id);
            entityBuilder.Property(m => m.Nom).IsRequired();
            entityBuilder.Property(m => m.Longitude).IsRequired();
            entityBuilder.Property(m => m.Latitude).IsRequired();
        }
    }
}

