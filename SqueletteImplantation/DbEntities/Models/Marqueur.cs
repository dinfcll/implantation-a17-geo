using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SqueletteImplantation.DbEntities.Models
{
    public class Marqueur
    {
        public int Id { get; set; }
        public string Nom { get; set; }
        public decimal Longitude { get; set; }
        public decimal Latitude { get; set; }
    }
}
