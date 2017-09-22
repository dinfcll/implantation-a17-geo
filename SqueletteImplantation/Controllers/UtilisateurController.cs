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
        EmailSender emailSender = new EmailSender();
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
        public IActionResult CreateUser([FromBody] UtilisateurDto user)
        {
            var identity = _maBd.Utilisateur.SingleOrDefault(u => u.email == user.Email);
            
            if(identity == null)
            {
                _maBd.Utilisateur.Add(user.CreateUtilisateur());
                _maBd.SaveChanges();
                emailSender.setDestination(user.Email);
                emailSender.setSender("ramble.cll@gmail.com","Welcome");
                emailSender.SetMessage("Bienvenue sur Ramble !");
                emailSender.setSubject("Bienvenue");
                emailSender.sendMessage();
            }
            else
            {
                return new ObjectResult(null);
            } 

            return new OkObjectResult(user);
        }
        
        [HttpPost]
        [Route("api/utilisateur/login")]
        public IActionResult Post([FromBody]UtilisateurDto user)
        {
            var identity = _maBd.Utilisateur.FirstOrDefault(m => m.email == user.Email && m.mdp == user.Mdp);

            if (identity == null)
            {
                return new ObjectResult(null);
            }

            return new ObjectResult(user);
        }
    }
}