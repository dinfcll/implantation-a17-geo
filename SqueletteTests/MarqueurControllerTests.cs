using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
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
        private readonly ProfilController _profilController;
        Profil profil = new Profil();
        public MarqueurControllerTests()
        {
            var options = new DbContextOptionsBuilder<MaBd>()
                .UseInMemoryDatabase("DatabaseMarqueur-" + $"{Guid.NewGuid()}")
                .Options;

            var bdEnMemoire = new MaBd(options);
            
            profil.nom = "bla";
            profil.courriel = "bla@bla.bla";
            profil.prenom = "blob";
            profil.profilId = 0;
            profil.profilimage = "";
            profil.username = "blablob";
            marqueur = new Marqueur();
            marqueur.Id = 0;
            marqueur.Nom = "woot";
            marqueur.Desc = "ben oui woot";
            marqueur.Icone = 0;
            marqueur.Latitude = 46.987m;
            marqueur.Longitude = -71.256m;
            marqueur.Trajetlat = "lat";
            marqueur.Trajetlng = "lng";
            marqueur.profilId = 0;
            marqueur.Profil = profil;
            marqueur.Difficulte = 0;
            marqueur.BanqueImage = "";
            marqueur.ImageMarqueur = "";
            marqueur.ServicesRando = "";
            
            _marqueurControlleur = new MarqueurController(bdEnMemoire, null);
            _profilController = new ProfilController(bdEnMemoire);
        }

        [Fact]
        public void testajoutmarqueur(){
            var result = _marqueurControlleur.CreateMarqueur(marqueur);
            Assert.Equal("woot", ((result as OkObjectResult).Value as Marqueur).Nom);
        }

        [Fact]
        public void supprimermarqueur(){
            var result = (_marqueurControlleur.CreateMarqueur(marqueur) as OkObjectResult).Value as Marqueur;
            var retoursupp = _marqueurControlleur.DeleteMarqueur(result.Id);
            Assert.Equal(200, (retoursupp as OkResult).StatusCode);
        }

        [Fact]
        public void Testsurlist(){
            var CreateMarqueur = _marqueurControlleur.CreateMarqueur(marqueur);
            Marqueur marq2 = new Marqueur();
            marq2.Id = 0;
            marq2.Nom = "banane";
            marq2.Desc = "woow";
            marq2.Icone = 0;
            marq2.Latitude = 2526.222m;
            marq2.Longitude = -7744.355m;
            marq2.Trajetlat = "tong";
            marq2.Trajetlng = "zarg";
            marq2.profilId = 0;
            marq2.Profil = profil;
            marq2.ImageMarqueur = "";
            marq2.BanqueImage = "";
            marq2.Difficulte = 0;
            marq2.ServicesRando = "";
            var Createsecondmarq = (_marqueurControlleur.CreateMarqueur(marq2) as OkObjectResult).Value as Marqueur;
            var delete = _marqueurControlleur.DeleteMarqueur(Createsecondmarq.Id);
            var retourlist = _marqueurControlleur.Index() as List<Marqueur>;
            Assert.Equal(1, retourlist.Count);
        }
        

    }
}