using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SqueletteImplantation.DbEntities.Models
{
    public class Following
    {
        public int id { get; set; }
        public int FollowerId { get; set; }
        public int FollowedId { get; set; }

        public Profil Follower { get; set; }
        public Profil Followed { get; set; }

    }
}
