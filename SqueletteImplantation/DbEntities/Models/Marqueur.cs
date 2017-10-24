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
        public string Desc { get; set; }
        public int Icone { get; set; }
        public string Trajetlat { get; set; }
        public string Trajetlng { get; set; }
        public int profilId { get; set; }
        public Profil Profil { get; set; }
        public string ImageMarqueur { get; set; }
    }
}
