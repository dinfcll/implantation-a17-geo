using System;
using System.Collections;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SqueletteImplantation.DbEntities;
using SqueletteImplantation.DbEntities.DTOs;
using SqueletteImplantation.DbEntities.Models;

namespace SqueletteImplantation.Controllers
{
    public class CommentController : Controller
    {
        private readonly MaBd _maBd;

        public CommentController(MaBd maBd)
        {
            _maBd = maBd;
        }

        [HttpGet]
        [Route("api/comment/{postId}")]
        public IEnumerable GetComment(int postId)
        {
            return _maBd.Comment.ToList().OrderByDescending(c => c.postId == postId);
        }

        [HttpPost]
        [Route("api/comment/add")]
        public IActionResult CreatePostUser([FromBody] CommentDto comment)
        {
            var comm = comment.CreateComment();

            if(comm != null)
            {
                _maBd.Comment.Add(comm);
                _maBd.SaveChanges();

                return new OkObjectResult(comm);
            }
            return new ObjectResult(null);           
        }
        
        [HttpDelete]
        [Route("api/comment/delete/{commentId}")]
        public IActionResult DeleteComment(int commentId)
        {
            var comm = _maBd.Comment.FirstOrDefault(m => m.commentId == commentId);

            if (comm == null)
            {
                return NotFound();
            }

            _maBd.Remove(comm);
            _maBd.SaveChanges();

            return new OkResult();
        }
    }
}