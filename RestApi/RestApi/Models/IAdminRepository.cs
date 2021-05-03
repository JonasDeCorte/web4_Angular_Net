using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestApi.Models
{
    public interface IAdminRepository
    {
        Admin GetBy(string email);
        void Add(Admin admin);
        void SaveChanges();
    }
}
