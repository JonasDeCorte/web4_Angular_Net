using Microsoft.EntityFrameworkCore;
using RestApi.Controllers;
using RestApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestApi.Data.Repositories
{
    public class BewonerRepository : IBewonerRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<Bewoner> _bewoners;

        public BewonerRepository(ApplicationDbContext dbContext)
        {
            _context = dbContext;
            _bewoners = dbContext.Bewoners;
        }

       

        public void Add(Bewoner bewoner)
        {
            _bewoners.Add(bewoner);
        }

        public void Delete(Bewoner bewoner)
        {
            _bewoners.Remove(bewoner);
        }

        public IEnumerable<Bewoner> GetAll()
        {
            return _bewoners.Include(x => x.Personeel).ToList();
        }

        public Bewoner GetBy(int id)
        {
            return _bewoners.Include(x => x.Personeel).SingleOrDefault(r => r.Id == id);
        }

        public IEnumerable<Bewoner> GetBy(string name = null, bool? EetOpKamer = null, bool? WordtGehaald = null)
        {
            var bewoners = _bewoners.AsQueryable();
            if (!string.IsNullOrEmpty(name))
                bewoners = _bewoners.Where(r => r.Name.IndexOf(name) >= 0);
            if (EetOpKamer.Equals(true))
                bewoners = _bewoners.Where(r => r.EetOpKamer == EetOpKamer);
            else
                bewoners = _bewoners.Where(r => r.EetOpKamer != EetOpKamer);
            if (WordtGehaald.Equals(true))
                bewoners = _bewoners.Where(r => r.WordtGehaald == WordtGehaald);
            else
                bewoners = _bewoners.Where(r => r.WordtGehaald != WordtGehaald);
            return _bewoners.OrderBy(r => r.Name).ToList();
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public bool TryGetBewoner(int id, out Bewoner bewoner)
        {
            bewoner = _context.Bewoners.Include(x => x.Personeel).FirstOrDefault(t => t.Id == id);
            return bewoner != null;
        }

        public void Update(Bewoner bewoner)
        {
            _context.Update(bewoner);
        }
    }
}
