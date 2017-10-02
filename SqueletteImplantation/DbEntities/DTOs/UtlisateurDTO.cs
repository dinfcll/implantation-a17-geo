using SqueletteImplantation.DbEntities.Models;

namespace SqueletteImplantation.DbEntities.DTOs
{
    public class UtilisateurDto
    {
        public string Email { get; set; }
        public string Mdp { get; set; }
        public bool reset { get; set; } 

        public UtilisateurDto(string e, string m, bool r)
        {
            this.Email = e;
            this.Mdp = m;
            this.reset = r;
        }

        public Utilisateur CreateUtilisateur()
        {
            return new Utilisateur { email = Email, mdp = Mdp, reset = false };
        }
        
    }
}
