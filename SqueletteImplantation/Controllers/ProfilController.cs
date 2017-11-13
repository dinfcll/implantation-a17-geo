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
    public class ProfilController : Controller
    {
        private readonly MaBd _maBd;

        public ProfilController(MaBd maBd)
        {
            _maBd = maBd;
        }

        [HttpGet]
        [Route("api/profil")]
        public IEnumerable Index()
        {
            return _maBd.Profil.ToList().OrderBy(i => i.profilId);
        }

        [HttpGet]
        [Route("api/profil/{email}")]
        public IActionResult GetProfil(string email)
        {
            var profil = _maBd.Profil.FirstOrDefault(pr => pr.courriel == email);

            if (profil == null)
            {
                return new OkObjectResult(null);
            }

            return new OkObjectResult(profil);
        }

        [HttpGet]
        [Route("api/profilbyid/{profilId}")]
        public IActionResult GetProfibyId(int profilId)
        {
            var profil = _maBd.Profil.FirstOrDefault(pr => pr.profilId == profilId);

            if (profil == null)
            {
                return new OkObjectResult(null);
            }

            return new OkObjectResult(profil);
        }

        [HttpPost]
        [Route("api/profil/create")]
        public IActionResult CreateProfil([FromBody] ProfilDto profilDto)
        {
            var trouve = _maBd.Profil.SingleOrDefault(pr => pr.courriel == profilDto.Courriel);

            if (trouve == null)
            {
                var profil = profilDto.CreateProfil();

                _maBd.Profil.Add(profil);
                _maBd.SaveChanges();

                return new OkObjectResult(profil);
            }

            return new OkObjectResult(null);          
        }

        [HttpPut]
        [Route("api/profil/edit")]
        public IActionResult EditProfil([FromBody] Profil updatedprofil)
        {
            var oldprofil = _maBd.Profil.FirstOrDefault(pr => pr.profilId == updatedprofil.profilId);

            if (oldprofil == null)
            {
                return new OkObjectResult(null);
            }

            _maBd.Entry(oldprofil).CurrentValues.SetValues(updatedprofil);
            _maBd.SaveChanges();                                             

            return new OkObjectResult(updatedprofil);
        }

        [HttpDelete]
        [Route("api/profil/delete/{id}")]
        public IActionResult DeleteProfil(int id)
        {
            var profil = _maBd.Profil.FirstOrDefault(pr => pr.profilId == id);

            if (profil == null)
            {
                return new OkObjectResult(null);
            }

            _maBd.Remove(profil);
            _maBd.SaveChanges();

            return new OkResult();
        }
    }
}