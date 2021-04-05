using Microsoft.EntityFrameworkCore;
using RestApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestApi.Data.Repositories
{
    public class PersoneelRepository : IPersoneelRepository
    {
        private readonly BewonerContext _context;
        private readonly DbSet<Personeel> _personeel;

        public PersoneelRepository(BewonerContext dbContext)
        {
            _context = dbContext;
            _personeel = dbContext.Personeels;
        }



        public void Add(Personeel Personeel)
        {
            _personeel.Add(Personeel);
        }

        public void Delete(Personeel Personeel)
        {
            _personeel.Remove(Personeel);
        }

        public IEnumerable<Personeel> GetAll()
        {
            return _personeel.ToList();
        }

        public Personeel GetBy(int id)
        {
            return _personeel.SingleOrDefault(r => r.Id == id);
        }

        public IEnumerable<Personeel> GetBy(string name = null)
        {
            var Personeels = _personeel.AsQueryable();
            if (!string.IsNullOrEmpty(name))
                Personeels = _personeel.Where(r => r.Name.IndexOf(name) >= 0);
            /* to do 
            if (EetOpKamer.Equals(true))
                Personeels = _Personeels.Where(r => r.EetOpKamer == EetOpKamer);
            else
                Personeels = _Personeels.Where(r => r.EetOpKamer != EetOpKamer);
            if (WordtGehaald.Equals(true))
                Personeels = _Personeels.Where(r => r.WordtGehaald == WordtGehaald);
            else
                Personeels = _Personeels.Where(r => r.WordtGehaald != WordtGehaald);*/
            return _personeel.OrderBy(r => r.Name).ToList();
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public bool TryGetPersoneel(int id, out Personeel Personeel)
        {
            Personeel = _context.Personeels.FirstOrDefault(t => t.Id == id);
            return Personeel != null;
        }

        public void Update(Personeel Personeel)
        {
            _context.Update(Personeel);
        }
    }
}
