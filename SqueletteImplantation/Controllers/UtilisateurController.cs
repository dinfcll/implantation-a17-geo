using System.Collections;
using System.Linq;
using System.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using SqueletteImplantation.DbEntities;
using SqueletteImplantation.DbEntities.DTOs;
using SqueletteImplantation.DbEntities.Models;
using System;

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
        private static Random random = new Random();
        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
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
                emailSender.setDestination(user.Email);
                emailSender.setSender("ramble.cll@gmail.com", "Welcome");
                emailSender.SetMessage("Bienvenue sur Ramble !");
                emailSender.setSubject("Bienvenue");
                emailSender.sendMessage();
                
                _maBd.Utilisateur.Add(user.CreateUtilisateur());
                _maBd.SaveChanges();
               
            }
            else
            {
                return new ObjectResult(null);
            } 

            return new OkObjectResult(user);
        }
        [HttpPost]
        [Route("api/utilisateur/reset")]
        public IActionResult Reset([FromBody] UtilisateurDto user)
        {
            var identity = _maBd.Utilisateur.SingleOrDefault(u => u.email == user.Email);

            if (identity != null)
            {
                identity.mdp = RandomString(8);
                emailSender.setDestination(user.Email);
                emailSender.setSender("ramble.cll@gmail.com", "Welcome");
                emailSender.SetMessage("Votre mot de passe temporaire est le " + identity.mdp.ToString() + "");
                emailSender.setSubject("Nouveau Mot de passe");
                emailSender.sendMessage();
                
                
                _maBd.Utilisateur.Attach(identity);
                
                var entry = _maBd.Entry(identity);
                entry.Property(e => e.mdp).IsModified = true;
                _maBd.SaveChanges();  
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