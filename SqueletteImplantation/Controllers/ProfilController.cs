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
            return _maBd.Profil.ToList();
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
            else
            {
                return new OkObjectResult(null);
            }            
        }

        [HttpPut]
        [Route("api/profil/edit")]
        public IActionResult EditProfil([FromBody] Profil updatedprofil)
        {
            var oldprofil = _maBd.Profil.FirstOrDefault(pr => pr.id == updatedprofil.id);

            if (oldprofil != null)
            {
                var utilisateur = _maBd.Utilisateur.FirstOrDefault(u => u.email == oldprofil.courriel);

                if (utilisateur != null)
                {
                    var trouve = _maBd.Utilisateur.SingleOrDefault(u => u.email == updatedprofil.courriel);

                    if (trouve == null || trouve.Id == utilisateur.Id)
                    {
                        utilisateur.email = updatedprofil.courriel;

                        _maBd.Utilisateur.Attach(utilisateur);

                        var entry = _maBd.Entry(utilisateur);
                        entry.Property(e => e.email).IsModified = true;
                        _maBd.SaveChanges();

                        _maBd.Profil.Attach(oldprofil);
                        _maBd.Entry(oldprofil).CurrentValues.SetValues(updatedprofil);
                        _maBd.SaveChanges();                                             

                        return new OkObjectResult(updatedprofil);
                    }                    
                }                
            }

            return new OkObjectResult(null);
                        
        }

        [HttpDelete]
        [Route("api/profil/delete/{id}")]
        public IActionResult DeleteProfil(int id)
        {
            var profil = _maBd.Profil.FirstOrDefault(pr => pr.id == id);

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