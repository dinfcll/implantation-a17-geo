using SqueletteImplantation.DbEntities;
using SqueletteImplantation.DbEntities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SqueletteImplantation
{
    public class initRamble
    {
        private readonly MaBd _maBd;
        public initRamble(MaBd maBd)
        {
            _maBd = maBd;
        }

        public async Task Seed(){
            var user = _maBd.Utilisateur.FirstOrDefault(pr => pr.email == "ramble.cll@gmail.com");
            if(user ==null)
            {
                Utilisateur newUSer = new Utilisateur();
                newUSer.email = "ramble.cll@gmail.com";
                newUSer.mdp = "annieisbae";
                newUSer.reset = false;
                newUSer.Id = 0;
                newUSer.typeutil = 1;
                _maBd.Utilisateur.Add(newUSer);
            }
            var profil = _maBd.Profil.FirstOrDefault(pr => pr.courriel == "ramble.cll@gmail.com");
            if (profil == null)
            {
                Profil newpr = new Profil();
                newpr.courriel = "ramble.cll@gmail.com";
                newpr.username = "RAMBLE";
                newpr.profilId = 0;

                _maBd.Profil.Add(newpr);
                _maBd.SaveChanges();               
            }
            await _maBd.SaveChangesAsync();
        }
    } 
}
