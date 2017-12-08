using SqueletteImplantation.DbEntities.Models;
using System;

namespace SqueletteImplantation.DbEntities.DTOs
{
    public class CommentDto
    {
        public string commentTxt { get; set; }
        public string commentUsername { get; set; }
        public int postId { get; set; }
        public int profilId { get; set; }

        public Comment CreateComment()
        {
            return new Comment { 
                commentTxt = commentTxt,
                commentUsername = commentUsername, 
                postId = postId, 
                profilId = profilId, 
                commentDate = DateTime.Today.ToString("d"), 
                commentShow = true };
        }
    }
}
