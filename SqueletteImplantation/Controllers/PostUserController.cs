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
            return _maBd.PostUser.ToList();
        }

        [HttpPost]
        [Route("api/postUser/create")]
        public IActionResult CreatePostUser(PostUserDto postUserDto)
        {
            var post = postUserDto.CreatePostUser();

            _maBd.PostUser.Add(post);
            _maBd.SaveChanges();

            return new OkObjectResult(post);
        }
    }
}