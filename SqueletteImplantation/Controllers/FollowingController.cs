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
    public class FollowingController
    {
        private readonly MaBd _maBd;

        public FollowingController(MaBd maBd)
        {
            _maBd = maBd;
        }
        [HttpGet]
        [Route("api/following/getFollowedById/{id}")]
        public IEnumerable Followed(string id)
        {
            return from b in _maBd.Following
                   join c in _maBd.Profil on b.FollowedId equals c.profilId
                   where b.FollowerId == int.Parse(id)
                   select c;

        }
        [HttpGet]
        [Route("api/following/getFollowerById/{id}")]
        public IEnumerable Follower(string id)
        {
            return from b in _maBd.Following
                   join c in _maBd.Profil on b.FollowerId equals c.profilId
                   where b.FollowedId == int.Parse(id)
                   select c;

        }
        [HttpGet]
        [Route("api/following/getSuggestionById/{id}")]
        public IEnumerable Suggestion(string id)
        {
            return (from b in _maBd.Profil
                   join c in _maBd.Following
                   on b.profilId equals c.FollowedId into ps
                   from c in ps.DefaultIfEmpty()
                   where c == null ||( c.FollowerId != int.Parse(id) && b.profilId!= int.Parse(id))
                   select b).Distinct();


        }

        [HttpGet]
        [Route("api/following/searchUser/{search}")]
        public IEnumerable Search(string search)
        {
            var res = _maBd.Profil.Where(m => m.username.Contains(search));
            return res;


        }
        [HttpPost]
        [Route("api/following/follow/{current}/{follow}")]
        public bool Follow(string current, string follow)
        {
            Following rel = new Following();
            rel.FollowedId = int.Parse(follow);
            rel.FollowerId = int.Parse(current);
            var res = _maBd.Following.FirstOrDefault(m => m.FollowerId == int.Parse(current) && m.FollowedId == int.Parse(follow));
            if (res == null)
            {
                _maBd.Following.Add(rel);
                _maBd.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }
        [HttpPost]
        [Route("api/following/unfollow/{current}/{follow}")]
        public bool unFollow(string current, string follow)
        {
            Following rel = new Following();
            rel.FollowedId = int.Parse(follow);
            rel.FollowerId = int.Parse(current);
            var res = _maBd.Following.FirstOrDefault(m => m.FollowedId == rel.FollowedId && m.FollowerId == rel.FollowerId);
            if (res == null)
            {
                return false;
            }

            _maBd.Remove(res);
            _maBd.SaveChanges();
            return true;
        }
    }

}

