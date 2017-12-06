namespace SqueletteImplantation.DbEntities.Models
{
    public class Comment
    {
        public int commentId { get; set; }
        public string commentTxt { get; set; }
        public string commentDate { get; set; }
        public bool commentShow { get; set; }
        public string commentUsername { get; set; }
        public int postId { get; set; }
        public PostsUser postsUser { get; set; }
        public int profilId { get; set; }
        public Profil profil { get; set; }
    }
}