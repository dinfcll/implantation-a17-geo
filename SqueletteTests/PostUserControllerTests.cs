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

        [Fact]
        public void TestChangePostLikeNumber() 
        {
            PostUserDto pdto = new PostUserDto("Test", "Test de tests");
            var test = _postUserController.CreatePostUser(pdto);

            var addLike = _postUserController.LikePostUser(((test as OkObjectResult).Value as PostsUser).postId);
            Assert.Equal(1, ((addLike as OkObjectResult).Value as PostsUser).postLike);
        }

        [Fact]
        public void TestMultipleChangePostLikeNumber() 
        {
            PostUserDto pdto = new PostUserDto("Test", "Test de tests");
            var test = _postUserController.CreatePostUser(pdto);

            var addLike1 = _postUserController.LikePostUser(((test as OkObjectResult).Value as PostsUser).postId);
            var addLike2 = _postUserController.LikePostUser(((test as OkObjectResult).Value as PostsUser).postId);
            var addLike3 = _postUserController.LikePostUser(((test as OkObjectResult).Value as PostsUser).postId);
            Assert.Equal(3, ((addLike3 as OkObjectResult).Value as PostsUser).postLike);
        }

        [Fact]
        public void TestPostUnlikeNumber() 
        {
            PostUserDto pdto = new PostUserDto("Test", "Test de tests");
            var test = _postUserController.CreatePostUser(pdto);

            var addLike = _postUserController.LikePostUser(((test as OkObjectResult).Value as PostsUser).postId);
            var unlike = _postUserController.UnlikePostUser(((test as OkObjectResult).Value as PostsUser).postId);
            Assert.Equal(0, ((unlike as OkObjectResult).Value as PostsUser).postLike);
        }

        [Fact]
        public void TestMultiplePostUnlikeNumber() 
        {
            PostUserDto pdto = new PostUserDto("Test", "Test de tests");
            var test = _postUserController.CreatePostUser(pdto);

            var addLike1 = _postUserController.LikePostUser(((test as OkObjectResult).Value as PostsUser).postId);
            var addLike2 = _postUserController.LikePostUser(((test as OkObjectResult).Value as PostsUser).postId);
            var addLike3 = _postUserController.LikePostUser(((test as OkObjectResult).Value as PostsUser).postId);
            var unlike = _postUserController.UnlikePostUser(((test as OkObjectResult).Value as PostsUser).postId);
            Assert.Equal(2, ((unlike as OkObjectResult).Value as PostsUser).postLike);
        }
    }
}