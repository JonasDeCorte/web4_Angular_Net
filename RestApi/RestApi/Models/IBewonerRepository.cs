using RestApi.Models;
using System;
using System.Collections.Generic;

namespace RestApi.Controllers
{
    public interface IBewonerRepository
    {
        Bewoner GetBy(int id);
        bool TryGetBewoner(int id, out Bewoner bewoner);
        IEnumerable<Bewoner> GetAll();
        IEnumerable<Bewoner> GetBy(string name = null, bool?EetOpKamer = null, bool?WordtGehaald= null);
        void Add(Bewoner bewoner);
        void Delete(Bewoner bewoner);
        void Update(Bewoner bewoner);
        void SaveChanges();
    }
}
