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
            const string chars = "qwertyuiopasdfghjklzxcvbnmABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }
        
        [HttpGet]
        [Route("api/utilisateur")]
        public IEnumerable Index()
        {
            return _maBd.Utilisateur.ToList().OrderBy(i =>i.Id);
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
                emailSender.setSender("ramble.cll@gmail.com", "Welcome");
                emailSender.SetHTMLMessage("<h1>Bienvenue sur Ramble !</h1><h2><br><a href='https://rando.dinf.cll.qc.ca/login'>https://rando.dinf.cll.qc.ca/login</a></h2>");
                emailSender.setSubject("Bienvenue");
                try
                {
                    emailSender.sendMessage();
                }
                catch(Exception ex)
                {
                    Object[] obj = { ex.Message, user };
                    return new OkObjectResult(false);
                }              
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
                identity.reset = true;
                identity.mdp = RandomString(8);
                emailSender.setDestination(user.Email);
                emailSender.setSender("ramble.cll@gmail.com", "Welcome");
                emailSender.SetHTMLMessage("Votre mot de passe temporaire est le <b> " + identity.mdp.ToString() + "</b><br><a href='https://rando.dinf.cll.qc.ca/login'>https://rando.dinf.cll.qc.ca/login</a>" );
                emailSender.setSubject("Nouveau Mot de passe");

                try
                {
                    emailSender.sendMessage();
                }
                catch (Exception ex)
                {
                    Object[] obj = { ex.Message, user };
                    return new OkObjectResult(false);
                }

                _maBd.Utilisateur.Attach(identity);
                
                var entry = _maBd.Entry(identity);
                entry.Property(e => e.mdp).IsModified = true;
                entry.Property(e => e.reset).IsModified = true;
                _maBd.SaveChanges();
            }
            else
            {
                return new ObjectResult(null);
            }
            return new OkObjectResult(user);
        }

        [HttpPost]
        [Route("api/utilisateur/newpw")]
        public IActionResult newPW([FromBody]UtilisateurDto user)
        {
            var identity = _maBd.Utilisateur.FirstOrDefault(m => m.email == user.Email);

            if (identity == null)
            {
                return new ObjectResult(null);
            } 

            if (identity.reset==false)
            {               
                return new ObjectResult(false);
            }
            else 
            {
                identity.reset = false;
                identity.mdp = user.Mdp;
                _maBd.Utilisateur.Attach(identity);

                var entry = _maBd.Entry(identity);
                entry.Property(e => e.mdp).IsModified = true;
                entry.Property(e => e.reset).IsModified = true;
                _maBd.SaveChanges();
            }

            user.reset = identity.reset;
            return new ObjectResult(user);
        }

        [HttpPost]
        [Route("api/utilisateur/login")]
        public IActionResult Login([FromBody]UtilisateurDto user)
        {
            var identity = _maBd.Utilisateur.FirstOrDefault(m => m.email == user.Email && m.mdp == user.Mdp);

            if (identity == null)
            {
                return new ObjectResult(null);
            }
            
            return new ObjectResult(identity);
        }

        [HttpGet]
        [Route("api/utilisateur/{email}")]
        public IActionResult GetUser(string email)
        {
            var identity = _maBd.Utilisateur.FirstOrDefault(u => u.email == email);

            if (identity == null)
            {
                return new OkObjectResult(null);
            }

            return new OkObjectResult(identity);
        }

        [HttpDelete]
        [Route("api/utilisateur/delete/{id}")]
        public IActionResult DeleteUser(int id)
        {
            var identity = _maBd.Utilisateur.FirstOrDefault(u => u.Id == id);
           
            if (identity == null)
            {
                return new ObjectResult(null);
            }

            _maBd.Remove(identity);
            _maBd.SaveChanges();

            return new OkResult();
        }

        [HttpPut]
        [Route("api/utilisateur/modiftypeutil/{id}/{typeutil}")]
        public IActionResult ModifTypeUtil(int id, int typeutil)
        {
            var user = _maBd.Utilisateur.FirstOrDefault(u => u.Id == id);

            if (user == null || user.Id == 0)
            {
                return new OkObjectResult(null);
            }

            user.typeutil = typeutil;

            _maBd.Utilisateur.Attach(user);

            var entry = _maBd.Entry(user);
            entry.Property(e => e.typeutil).IsModified = true;
            _maBd.SaveChanges();

            return new OkObjectResult(user);
        }
    }
}