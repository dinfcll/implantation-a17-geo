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
    public class UtilisateurControllerTests
    { 
        private readonly UtilisateurController _utilisateurController;
        private MaBd dbEnMemoire;

        public UtilisateurControllerTests() 
        {
            var options = new DbContextOptionsBuilder<MaBd>()
                .UseInMemoryDatabase("DatabaseUtilisateur-" + $"{Guid.NewGuid()}")
                .Options;

            dbEnMemoire = new MaBd(options);

            _utilisateurController = new UtilisateurController(dbEnMemoire);
        }

        [Fact]
        public void TestLoginNotFound() 
        {
            UtilisateurDto udto = new UtilisateurDto("x", "x", false);
            var test = _utilisateurController.Login(udto);

            Assert.Null((test as ObjectResult).StatusCode);
        }

        [Fact]
        public void TestDeleteNotFound()
        {
            var test = _utilisateurController.DeleteUser(-666);

            Assert.Null((test as ObjectResult).StatusCode);
        }

        [Fact]
        public void TestLoginUserInMemory()
        {
            UtilisateurDto udto = new UtilisateurDto("x", "x", false);
            Utilisateur u = udto.CreateUtilisateur();

            dbEnMemoire.Add(u);
            dbEnMemoire.SaveChanges();
            
            var result = _utilisateurController.Login(udto);

            Assert.NotNull(result as ObjectResult);
        }
    }
}