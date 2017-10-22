using System.Collections;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using SqueletteImplantation.DbEntities;
using SqueletteImplantation.DbEntities.DTOs;
using SqueletteImplantation.DbEntities.Models;

namespace SqueletteImplantation.Controllers
{
    public class PostUserController : Controller
    {
        private readonly MaBd _maBd;

        public PostUserController(MaBd maBd)
        {
            _maBd = maBd;
        }

        [HttpGet]
        [Route("api/postUser")]
        public IEnumerable GetListPost()
        {
            return _maBd.PostsUser.ToList();
        }

        [HttpPost]
        [Route("api/postUser/create")]
        public IActionResult CreatePostUser([FromBody]PostUserDto pu)
        {
            var post = pu.CreatePostUser();

            if(post != null)
            {
                _maBd.PostsUser.Add(post);
                _maBd.SaveChanges();

                return new OkObjectResult(post);
            }
            return new ObjectResult(null);           
        }

        [HttpPut]
        [Route("api/postUser/modify/{id}")]
        public IActionResult ModifyPostUser(PostsUser updatedPost)
        {
            var post = _maBd.PostsUser.FirstOrDefault(m => m.postId == updatedPost.postId);

            if (post == null)
            {
                return new ObjectResult(null);
            }

            _maBd.Entry(post).CurrentValues.SetValues(updatedPost);

            return new OkObjectResult(post);
        }

        [HttpDelete]
        [Route("api/postUser/delete/{id}")]
        public IActionResult DeletePostUser(int id)
        {
            var post = _maBd.PostsUser.FirstOrDefault(m => m.postId == id);

            if (post == null)
            {
                return NotFound();
            }

            _maBd.Remove(post);
            _maBd.SaveChanges();

            return new OkResult();
        }
    }
}