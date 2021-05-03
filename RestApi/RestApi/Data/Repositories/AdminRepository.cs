using Microsoft.EntityFrameworkCore;
using RestApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestApi.Data.Repositories
{
    public class AdminRepository : IAdminRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<Admin> _Admins;
        public AdminRepository(ApplicationDbContext context)
        {
            _context = context;
            _Admins = _context.Admins;
        }
        public void Add(Admin admin)
        {
            _Admins.Add(admin);
        }

        public Admin GetBy(string email)
        {
            return _Admins.SingleOrDefault(c => c.Email == email);
        }

        public void SaveChanges()
        {
            _context.SaveChanges();
        }
    }
}
