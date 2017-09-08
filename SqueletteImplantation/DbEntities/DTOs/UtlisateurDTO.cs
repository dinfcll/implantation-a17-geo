using SqueletteImplantation.DbEntities.Models;

namespace SqueletteImplantation.DbEntities.DTOs
{
    public class UtilisateurDto
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Mdp { get; set; }

        public Utilisateur CreateUtilisateur()
        {
            return new Utilisateur { Id = Id, email = Email, mdp = Mdp };
        }
    }
}
