using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using SqueletteImplantation.DbEntities;
using SqueletteImplantation.DbEntities.Models;
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
            var idFollow = from ami in _maBd.Following
                            where ami.FollowedId == id
                            select ami.FollowedId;
            //where id == followerId
            return _maBd.Marqueur.Where(m => idFollow.Contains(m.profilId) && m.profilId == id).ToList();
        }

        [HttpPost]
        [Route("api/marqueurs")]
        public IActionResult CreateMarqueur([FromBody]Marqueur marqueur)
        {
                
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
