using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestApi.Models
{
   public interface IPersoneelRepository
    {
        Personeel GetBy(int id);
        bool TryGetPersoneel(int id, out Personeel personeel);
        IEnumerable<Personeel> GetAll();
        IEnumerable<Personeel> GetBy(string name = null);
        void Add(Personeel personeel);
        void Delete(Personeel personeel);
        void Update(Personeel personeel);
        void SaveChanges();
    }
}
