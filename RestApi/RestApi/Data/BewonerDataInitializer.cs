using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestApi.Data
{
    public class BewonerDataInitializer
    {
        private readonly ApplicationDbContext _dbContext;
        public BewonerDataInitializer(ApplicationDbContext DbContext)
        {
            _dbContext = DbContext;
        }
        public void InitializeData()
        {
            _dbContext.Database.EnsureDeleted();
            if (_dbContext.Database.EnsureCreated())
            {
                //seeding the database with bewoners, see DBContext               
            }
        }
    }
}
