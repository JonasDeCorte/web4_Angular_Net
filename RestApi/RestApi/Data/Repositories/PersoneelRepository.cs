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
        private readonly ApplicationDbContext _context;
        private readonly DbSet<Personeel> _personeel;

        public PersoneelRepository(ApplicationDbContext dbContext)
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
            return _personeel.Include(x => x.Image).Include(x => x.Bewoners).ToList();
        }

        public Personeel GetBy(int id)
        {
            return _personeel.Include(x => x.Image).Include(x => x.Bewoners).SingleOrDefault(r => r.Id == id);
        }

        public IEnumerable<Personeel> GetBy(string name = null, string functie = null)
        {
            var PersoneelsLijstFiltered = _personeel.Include(x => x.Image).Include(x => x.Bewoners).AsQueryable();
            if (!string.IsNullOrEmpty(name))
                PersoneelsLijstFiltered = _personeel.Where(r => r.Name.IndexOf(name) >= 0);
            if (!string.IsNullOrEmpty(functie))
                PersoneelsLijstFiltered = _personeel.Where(r => r.Functie==functie);
            return PersoneelsLijstFiltered.OrderBy(r => r.Name).ToList();
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }

        public bool TryGetPersoneel(int id, out Personeel Personeel)
        {
            Personeel = _context.Personeels.Include(x => x.Image).Include(x => x.Bewoners).FirstOrDefault(t => t.Id == id);
            return Personeel != null;
        }

        public void Update(Personeel Personeel)
        {
            _context.Update(Personeel);
        }
    }
}
