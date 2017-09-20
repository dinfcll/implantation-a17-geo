using System.Collections;
using System.Linq;
using System.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using SqueletteImplantation.DbEntities;
using SqueletteImplantation.DbEntities.DTOs;
using SqueletteImplantation.DbEntities.Models;

namespace SqueletteImplantation.Controllers
{
    public class ProfilController : Controller
    {
        private readonly MaBd _maBd;

        public ProfilController(MaBd maBd)
        {
            _maBd = maBd;
        }
        
        [HttpGet]
        [Route("api/profil")]
        public IEnumerable Index()
        {
            return _maBd.Profil.ToList();
        }

        [HttpGet]
        [Route("api/profil/{email}")]
        public IActionResult GetProfil(string email)
        {
            var profil = _maBd.Profil.FirstOrDefault(m => m.courriel == email);

            if (profil == null)
            {
                return NotFound();
            }

            return new OkObjectResult(profil);
        }
        /*//je ne sais pas si ça marche

        [HttpPost]
        [Route("api/profil/create")]
        public bool CreateProfil([FromBody] ProfilDto profil)
        {
            if(_maBd.Profil.SingleOrDefault(p => profil.Courriel == p.courriel) == null)
            {
                _maBd.Profil.Add(profil.CreateProfil());
                _maBd.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }  
        }
        */
        //[HttpPost]
        //[Route("api/utilisateur/login")]
        //public IActionResult Post([FromBody]UtilisateurDto user)
        //{
        //    var identity = _maBd.Utilisateur.FirstOrDefault(m => m.email == user.Email && m.mdp == user.Mdp);

        //    if (identity == null)
        //    {
        //        return new ObjectResult(null);
        //    }

        //    return new ObjectResult(user);
        //}
    }
}