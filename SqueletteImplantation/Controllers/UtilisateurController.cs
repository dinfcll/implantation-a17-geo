using System.Collections;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
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

        /*[HttpGet]
        [Route("api/utilisateur")]
        public IEnumerable Index()
        {
            return _maBd.Utilisateur.ToList();
        }*/

        /*[HttpPost]
        [Route("api/utilisateur")]
        public IActionResult CreateUtilisateur(UtilisateurDto utilisateurDto)
        {
            var utilisateur = utilisateurDto.CreateUtilisateur();

            _maBd.Utilisateur.Add(utilisateur);
            _maBd.SaveChanges();

            return new OkObjectResult(utilisateur);
        }*/

        [HttpGet]
        [Route("api/utilisateur")]
        public IActionResult GetUtilisateur(UtilisateurDto user)
        {
            var utilisateur = _maBd.Utilisateur
                .FirstOrDefault(m => m.email == user.email && m.mdp == user.mdp);

            if (utilisateur == null)
            {
                console.log(utilisateur);
            }

            return new OkObjectResult(utilisateur);
            console.log(utilisateur);
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