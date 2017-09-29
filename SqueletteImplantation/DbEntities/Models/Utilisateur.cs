namespace SqueletteImplantation.DbEntities.Models
{
    public class Utilisateur
    {
        public int Id { get; set; }
        public string email { get; set; }
        public string mdp { get; set; }
        public bool reset { get; set; }
   }
}