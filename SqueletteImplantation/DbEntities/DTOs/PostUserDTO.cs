using SqueletteImplantation.DbEntities.Models;

namespace SqueletteImplantation.DbEntities.DTOs
{
    public class PostUserDto
    {
        public string postTitle { get; set; }
        public string postText { get; set; }
        public int postId { get; set; }
        public int profilId { get; set; }

        public PostUserDto(string title, string txt) 
        {
            this.postTitle = title;
            this.postText = txt;
        }

        public PostUserDto(string title, string txt, int proId)
        {
            this.postTitle = title;
            this.postText = txt;
            this.profilId = proId;
        }

        public PostsUser CreatePostUser()
        {
            return new PostsUser { postTitle = postTitle, postText = postText, 
                postId = postId, profilId = profilId };
        }
    }
}