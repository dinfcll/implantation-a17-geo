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
        /*//je ne sais pas si ça marche
        [HttpGet]
        [Route("api/profil")]
        public IEnumerable Index()
        {
            return _maBd.Profil.ToList();
        }

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