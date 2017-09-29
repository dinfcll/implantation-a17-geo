using SqueletteImplantation.DbEntities.Models;

namespace SqueletteImplantation.DbEntities.DTOs
{
    public class UtilisateurDto
    {
        public string Email { get; set; }
        public string Mdp { get; set; }

        public Utilisateur CreateUtilisateur()
        {
            return new Utilisateur { email = Email, mdp = Mdp };
        }        
    }
}
