using SqueletteImplantation.DbEntities.Models;

namespace SqueletteImplantation.DbEntities.DTOs
{
    public class ProfilDto
    {
        public string Courriel { get; set; }
        public string Username { get; set; }
        public string Prenom { get; set; }
        public string Nom { get; set; }

        public Profil CreateProfil()
        {
            return new Profil { courriel = Courriel, username = Username, 
                prenom = Prenom, nom = Nom };
        }
    }
}
