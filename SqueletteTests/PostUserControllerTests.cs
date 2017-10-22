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
    public class PostUserControllerTests
    { 
        private readonly PostUserController _postUserController;
        private MaBd dbEnMemoire;

        public PostUserControllerTests() 
        {
            var options = new DbContextOptionsBuilder<MaBd>()
                .UseInMemoryDatabase("DatabaseUtilisateur-" + $"{Guid.NewGuid()}")
                .Options;

            dbEnMemoire = new MaBd(options);

            _postUserController = new PostUserController(dbEnMemoire);
        }

        [Fact]
        public void TestNewPost() 
        {
            PostUserDto pdto = new PostUserDto("Test", "Test de tests");
            var test = _postUserController.CreatePostUser(pdto);

            Assert.NotNull((test as ObjectResult).StatusCode);
        }

        [Fact]
        public void TestGetListPostVide() 
        {
            var test = _postUserController.GetListPost();

            Assert.Null((test as ObjectResult));
        }
    }
}