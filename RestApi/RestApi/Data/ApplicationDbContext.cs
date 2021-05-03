using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using RestApi.Data.Mappers;
using RestApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestApi.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
        public DbSet<Bewoner> Bewoners { get; set; }
        public DbSet<Personeel> Personeels { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Admin> Admins { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfiguration(new ImageConfiguration());
            builder.ApplyConfiguration(new BewonerConfiguration());
            builder.ApplyConfiguration(new PersoneelConfiguration());
            builder.ApplyConfiguration(new AdminConfiguration());

        }
       
    }
}
