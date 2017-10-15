using Microsoft.AspNetCore.Mvc;
using SqueletteImplantation.DbEntities;
using SqueletteImplantation.DbEntities.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
        [Route("api/marqueurs/trajet")]
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
    }
}
