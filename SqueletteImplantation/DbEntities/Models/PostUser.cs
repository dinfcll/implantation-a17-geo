namespace SqueletteImplantation.DbEntities.Models
{
    public class PostUser
    {
        public int postId { get; set; }
        public string postTitle { get; set; }
        public string postText { get; set; }
        public int profilId { get; set; }
        public Profil Profil { get; set; }
   }
}