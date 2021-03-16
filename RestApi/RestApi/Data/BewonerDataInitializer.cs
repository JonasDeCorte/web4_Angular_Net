using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestApi.Data
{
    public class BewonerDataInitializer
    {
        private readonly BewonerContext _dbContext;
        public BewonerDataInitializer(BewonerContext DbContext)
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
