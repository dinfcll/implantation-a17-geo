using SqueletteImplantation.DbEntities.Models;

namespace SqueletteImplantation.DbEntities.DTOs
{
    public class PostUserDto
    {
        public string postTitle { get; set; }
        public string postText { get; set; }
        public int postId { get; set; }

        public PostUserDto(string title, string txt) 
        {
            this.postTitle = title;
            this.postText = txt;
        }

        public PostsUser CreatePostUser()
        {
            return new PostsUser { postTitle = postTitle, postText = postText, postId = postId };
        }
    }
}