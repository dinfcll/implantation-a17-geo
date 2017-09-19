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
        public bool CreateUtilisateur([FromBody] UtilisateurDto user)
        {
            if(_maBd.Utilisateur.SingleOrDefault(u => user.Email == u.email) == null)
            {
                _maBd.Utilisateur.Add(user.CreateUtilisateur());
                _maBd.SaveChanges();
                emailSender.setDestination("antoine.emond@hotmail.com");
                emailSender.setSender("ramble.cll@gmail.com","Antoine");
                emailSender.SetMessage("hello whale cum");
                emailSender.setSubject("whale cum");
                emailSender.sendMessage("smtp.gmail.com");
          


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
    }
}