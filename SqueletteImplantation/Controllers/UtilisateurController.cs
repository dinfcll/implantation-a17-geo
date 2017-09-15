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
    public class UtilisateurController : Controller
    {
        private readonly MaBd _maBd;

        public UtilisateurController(MaBd maBd)
        {
            _maBd = maBd;
        }

        [HttpGet]
        [Route("api/utilisateur")]
        public IEnumerable Index()
        {
            return _maBd.Utilisateur.ToList();
        }

        [HttpPost]
        [Route("api/utilisateur/signin")]
        public bool CreateUtilisateur([FromBody] UtilisateurDto user)
        {
            if(_maBd.Utilisateur.SingleOrDefault(u => user.Email == u.email) == null)
            {
                _maBd.Utilisateur.Add(user.CreateUtilisateur());
                _maBd.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
            

            

            
        }
        [HttpPost]
        [Route("api/utilisateur/login")]
        public IActionResult Post([FromBody]Utilisateur user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var identity = _maBd.Utilisateur.FirstOrDefault(m => m.email == user.email && m.mdp == user.mdp);

            if (identity == null)
            {
                return BadRequest(ModelState);
            }

            return new ObjectResult(user);
        }
        
        /*[HttpPut]
        [Route("api/utilisateur/{email}")]
        public IActionResult ModifyUtilisateur(Utilisateur updatedUtilisateur)
        {
            var utilisateur = _maBd.Utilisateur.FirstOrDefault(m => m.email == updatedUtilisateur.email);

            if (utilisateur == null)
            {
                return NotFound();
            }

            _maBd.Entry(utilisateur).CurrentValues.SetValues(updatedUtilisateur);

            return new OkResult();
        }

        [HttpDelete]
        [Route("api/utilisateur/{email}")]
        public IActionResult DeleteUtilisateur(int id)
        {
            var utilisateur = _maBd.Utilisateur.FirstOrDefault(m => m.Id == id);

            if (utilisateur == null)
            {
                return NotFound();
            }

            _maBd.Remove(utilisateur);
            _maBd.SaveChanges();

            return new OkResult();
        }*/

    }
}