using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SqueletteImplantation.Controllers;
using SqueletteImplantation.DbEntities;
using SqueletteImplantation.DbEntities.DTOs;
using SqueletteImplantation.DbEntities.Models;
using Xunit;

namespace SqueletteTests
{
    public class MarqueurControllerTests
    {
        //un commentaire
        private Marqueur marqueur;

        private readonly MarqueurController _marqueurControlleur;

        public MarqueurControllerTests()
        {
            var options = new DbContextOptionsBuilder<MaBd>()
                .UseInMemoryDatabase("DatabaseMarqueur-" + $"{Guid.NewGuid()}")
                .Options;

            var bdEnMemoire = new MaBd(options);
            marqueur = new Marqueur();
            marqueur.Id = 0;
            marqueur.Nom = "woot";
            marqueur.Desc = "ben oui woot";
            marqueur.Icone = 0;
            marqueur.Latitude = 46.987m;
            marqueur.Longitude = -71.256m;
            marqueur.Trajetlat = "lat";
            marqueur.Trajetlng = "lng";

            _marqueurControlleur = new MarqueurController(bdEnMemoire);
        }

        [Fact]
        public void testajoutmarqueur(){
            var result = _marqueurControlleur.CreateMarqueur(marqueur);
            Assert.Equal("woot", ((result as OkObjectResult).Value as Marqueur).Nom);
        }

        [Fact]
        public void supprimermarqueur(){
            var result = _marqueurControlleur.CreateMarqueur(marqueur);
            var retoursupp = _marqueurControlleur.DeleteMarqueur(1);
            Assert.Equal(200, (retoursupp as OkResult).StatusCode);

            var nontrouve = _marqueurControlleur.GetMarqueur(1);
            Assert.Equal(404,((NotFoundResult)nontrouve).StatusCode);
        }
        

    }
}