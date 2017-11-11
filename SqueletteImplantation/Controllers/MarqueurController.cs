using Microsoft.AspNetCore.Mvc;
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

        public MarqueurController(MaBd maBd)
        {
            _maBd = maBd;
        }

        [HttpGet]
        [Route("api/marqueurs")]
        public IEnumerable Index()
        {
            return _maBd.Marqueur.ToList();
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
        public IActionResult AjoutImageABanqueImage(int id, IList<IFormFile> fichier, string nomFichier)
        {
            int nb = fichier.Count;
            
            /* 
            var marqueurCourant = _maBd.Marqueur.FirstOrDefault(m => m.Id == id);

            if(marqueurCourant == null)
            {
                return NotFound();
            }
            
            int idUniqueFichier = Directory.GetFiles("../wwwwroot/images/banqueImageMarqueur/","*",SearchOption.TopDirectoryOnly).Length;
            string nomUniqueFichier = id.ToString() + marqueurCourant.Nom + idUniqueFichier.ToString();
            string CheminImage = "../wwwwroot/images/banqueImageMarqueur/" + nomUniqueFichier;
            

            marqueurCourant.BanqueImage = nomUniqueFichier + marqueurCourant.BanqueImage;
            _maBd.SaveChanges(); */
            
            return new OkObjectResult(nb);
        }
    }
}
