namespace SqueletteImplantation.DbEntities.Models
{
    public class PostsUser
    {
        public int postId { get; set; }
        public string postTitle { get; set; }
        public string postText { get; set; }
        public int postLike { get; set; }
        public string postImg { get; set; }
        public int profilId { get; set; }
        public Profil Profil { get; set; }
   }
}