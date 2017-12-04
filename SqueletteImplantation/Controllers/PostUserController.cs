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
            return _maBd.PostsUser.ToList().OrderByDescending(p => p.postId);
        }

        [HttpPost]
        [Route("api/postUser/create")]
        public IActionResult CreatePostUser([FromBody] PostUserDto pu)
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
        public IActionResult ModifyPostUser([FromBody] PostUserDto updatedPost, int id)
        {
            var post = _maBd.PostsUser.FirstOrDefault(m => m.postId == id);

            if (post == null)
            {
                return new ObjectResult(null);
            }

            _maBd.Entry(post).CurrentValues.SetValues(updatedPost);
            _maBd.SaveChanges();

            return new OkObjectResult(post);
        }

        [HttpPost]
        [Route("api/postUser/like")]
        public IActionResult LikePostUser([FromBody] int id)
        {
            var post = _maBd.PostsUser.SingleOrDefault(m => m.postId == id);

            if (post == null)
            {
                return NotFound();
            }

            post.postLike = post.postLike + 1;

            _maBd.SaveChanges();

            return new OkObjectResult(post);
        }

        [HttpPost]
        [Route("api/postUser/unlike")]
        public IActionResult UnlikePostUser([FromBody] int id)
        {
            var post = _maBd.PostsUser.FirstOrDefault(m => m.postId == id);

            if (post == null)
            {
                return new ObjectResult(null);
            }
            
            post.postLike = post.postLike - 1;
            _maBd.SaveChanges();

            return new OkObjectResult(post);
        }

        [HttpGet]
        [Route("api/postUser/myPosts/{id}")]
        public IEnumerable GetmyPost(int id)
        {
            return from c in _maBd.PostsUser
                   where c.profilId == id orderby c.postId descending
                   select c;
        }

        [HttpGet]
        [Route("api/postUser/followedPost/{id}")]
        public IEnumerable GetFollowedPost(int id)
        {
            return from b in _maBd.Following
            join c in _maBd.PostsUser on b.FollowedId equals c.profilId
            where (b.FollowerId == id || c.profilId==id) orderby c.postId descending
            select c;

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