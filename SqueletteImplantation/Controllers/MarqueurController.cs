using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using SqueletteImplantation.DbEntities;
using SqueletteImplantation.DbEntities.Models;
using SqueletteImplantation.DbEntities.DTOs;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using System.IO;


namespace SqueletteImplantation.Controllers
{
    public class MarqueurController
    {
        private readonly MaBd _maBd;
        private readonly IHostingEnvironment _hostingEnvironment;

        public MarqueurController(MaBd maBd, IHostingEnvironment env)
        {
            _maBd = maBd;
            _hostingEnvironment = env;
        }

        [HttpGet]
        [Route("api/marqueurs")]
        public IEnumerable Index()
        {
            return _maBd.Marqueur.ToList();
        }

        [HttpGet]
        [Route("api/marqueurs/suivi/{id}")]
        public IEnumerable marqueursuivi(int id)
        {
            var marquser = _maBd.Marqueur.Where( m => m.profilId == id).ToList();
            var marqami = from suivi in _maBd.Following
                    join marq in _maBd.Marqueur on suivi.FollowedId equals marq.profilId
                    where suivi.FollowerId == id
                    select marq;

            marquser.AddRange(marqami);
            return marquser;
        }

        [HttpPost]
        [Route("api/marqueurs")]
        public IActionResult CreateMarqueur([FromBody]Marqueur marqueur)
        {
            var profil = _maBd.Profil.FirstOrDefault(p => p.profilId == marqueur.profilId);
            PostsUser nouveauPost = new PostsUser();
            nouveauPost.profilId = marqueur.profilId;
            nouveauPost.Profil = marqueur.Profil;
            nouveauPost.postTitle = "Marqueur " + marqueur.Nom + " créé par: " + profil.username;
            nouveauPost.postText = marqueur.Desc;
            nouveauPost.postLike = 0;
            nouveauPost.postImg = "";

            _maBd.PostsUser.Add(nouveauPost);
            _maBd.Marqueur.Add(marqueur);
            _maBd.SaveChanges();

            return new OkObjectResult(marqueur);
        }

        [HttpPost]
        [Route("api/marqueurs/modification")]
        public IActionResult AjoutTrajet([FromBody]Marqueur marqueur)
        {
            var oldmark = _maBd.Marqueur.FirstOrDefault(m => m.Id == marqueur.Id);

            if(oldmark != null)
            {
                _maBd.Entry(oldmark).CurrentValues.SetValues(marqueur);
                _maBd.SaveChanges();

                return new OkObjectResult(marqueur);
            }

            return new OkObjectResult(null);
        }
        
        [HttpGet]
        [Route("api/marqueurs/{id}")]
        public IActionResult GetMarqueur(int id)
        {
            var marqueur = _maBd.Marqueur.FirstOrDefault(m => m.Id == id);

            if (marqueur == null)
            {
                return NotFound();
            }

            return new OkObjectResult(marqueur);
        }

        private IActionResult NotFound()
        {
            throw new NotImplementedException();
        }

        [HttpDelete]
        [Route("api/marqueurs/{id}")]
        public IActionResult DeleteMarqueur(int id)
        {
            var marqueur = _maBd.Marqueur.FirstOrDefault(m => m.Id == id);

            if (marqueur == null)
            {
                return NotFound();
            }

            _maBd.Remove(marqueur);
            _maBd.SaveChanges();

            return new OkResult();
        }

        [HttpPost]
        [Route("api/marqueurs/banqueimage/{id}")]
        public IActionResult AjoutImageABanqueImage(int id, IFormFile fichier, string extFichier)
        {                   
            var marqueur = _maBd.Marqueur.FirstOrDefault(m => m.Id == id);
            if(marqueur == null)
            {
                return NotFound();
            }
            string cheminRoot = _hostingEnvironment.WebRootPath;
            string cheminImageUbuntu = "/images/banqueImageMarqueur/";
            int idUniqueFichier = Directory.GetFiles(cheminRoot + cheminImageUbuntu,"*",SearchOption.TopDirectoryOnly).Length;
            string nomUniqueFichier = id.ToString() + marqueur.Nom + idUniqueFichier.ToString()+ "." + extFichier;
            fichier.CopyTo(new FileStream(cheminRoot + cheminImageUbuntu + nomUniqueFichier, FileMode.Create));

            marqueur.BanqueImage = nomUniqueFichier + "," + marqueur.BanqueImage;
            _maBd.SaveChanges(); 
                
            return new OkObjectResult(nomUniqueFichier);
            
        }
    }
}
